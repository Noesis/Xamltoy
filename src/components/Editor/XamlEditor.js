import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
const CodeMirrorLib = require('codemirror');

require("codemirror/addon/hint/show-hint.css");
require('codemirror/lib/codemirror.css');
require('codemirror/addon/edit/closetag.js');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/noesis-hint.js');
require('codemirror/mode/xml/xml.js'); 
require('codemirror/src/modes.js');

class XamlEditor extends React.PureComponent {

  constructor(props) {
    super(props);
    this.instance = null;
    this.tags = {
      "!top": ["Grid"],
      Grid: {
        attrs: {},
        children: ["UIElement"]
      },
      UIElement: {
        attrs: {
          Visibility: ['Collapsed', 'Hidden', 'Visible']
        },
        children: []
      },
      FrameworkElement: {
        attrs: {
          Width: null,
          Height: null
        },
        base: "UIElement",
        children: []
      },
      Shape: {
        attrs: {
          Fill: null,
          Stroke: null
        },
        base: "FrameworkElement",
        children: []
      },
      Rectangle: {
        attrs: {},
        base: "Shape"
      },
      Ellipse: {
        attrs: {},
        base: "Shape"
      }
    }
  }

  render() {
    return (
      <div id="xamlEditorContainer">
        <button 
          title="Run with ctrl/cmd + s or Alt + Enter" 
          type="button" 
          id="run-button" 
          className="runButton" 
          onClick={this.runButtonPressed.bind(this)}
        >
          <img src="images/play.png" alt="RUN"></img>RUN
        </button>
        <CodeMirror className="CodeMirror"
          value={this.props.value}
          onBeforeChange={this.onChange.bind(this)}
          editorDidMount={editor => { this.instance = editor }}
          options={{
            mode: 'xml',
            xmlHint: true,
            autoCloseTags: true,
            lineNumbers: true,
            tabSize: 2,
            hintOptions: { schemaInfo: this.tags },
            extraKeys: {
              "'<'": (cm) => this.completeAfter(cm),
              "'/'": (cm) => this.completeIfAfterLt(cm),
              "'='": (cm) => this.completeIfInTag(cm, '='),
              "' '": (cm) => this.completeIfInTag(cm, ' '),
              Tab: (cm) => {
                if (cm.somethingSelected()) {
                  cm.indentSelection("add");
                } else {
                  cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
                  Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
                }
              }
            }
          }}
        />
      </div>
    )
  }

  completeAfter(cm, pred) {
    let predResult;
    if(pred)  predResult = pred();
    if (!pred || predResult.hint) setTimeout(function () {
      if (!cm.state.completionActive)
        cm.showHint({
          completeSingle: false,
          matchInMiddle: true
        });
    }, 100);
    if (pred && predResult.skipkey) return false;
    return CodeMirrorLib.Pass;
  }

  completeIfAfterLt(cm) {
    return this.completeAfter(cm, function () {
      var cur = cm.getCursor();
      return cm.getRange(CodeMirrorLib.Pos(cur.line, cur.ch - 1), cur) === "<";
    });
  }

  completeIfInTag(cm, key) {
    return this.completeAfter(cm, function () {
      var tok = cm.getTokenAt(cm.getCursor());
      let currentCursor = cm.getCursor();
      if (tok.type === "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length === 1)) return false;
      var inner = CodeMirrorLib.innerMode(cm.getMode(), tok.state).state;
      let replaceWithAttrValue = inner.tagName != null && key === '=' && cm.getTokenAt(currentCursor).type !== "string";
      if (replaceWithAttrValue){
        cm.replaceRange('=""', { line: currentCursor.line, ch: currentCursor.ch })
        cm.setCursor({ line: currentCursor.line, ch: currentCursor.ch + 2 })
      }
      return { hint: inner.tagName, skipkey: replaceWithAttrValue };
    });
  }

  onChange(editor, data, value) {
    window.codemirror = editor;
    this.props.updateData('xaml', value)
  }

  runButtonPressed() {
    this.props.runCode()
  }

} 

export default XamlEditor;