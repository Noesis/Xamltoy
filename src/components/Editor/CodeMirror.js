import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Schema from './codemirror/schema';

const CodeMirrorLib = require('codemirror');

require('./codemirror/noesis-hint');
require('./codemirror/show-hint');
require("codemirror/addon/hint/show-hint.css");
require('codemirror/lib/codemirror.css');
require('codemirror/addon/edit/closetag.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/src/modes.js');


class CodeMirrorComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.CodemirrorInstance = null;
    this.schema = Schema;
  }

  render() {
    return (
      <div id="xamlEditorContainer">
        <button
          title="Run with Ctrl/Cmd+S or Alt+Enter"
          type="button"
          id="run-button"
          className="runButton"
          onClick={this.runButtonPressed.bind(this)}
        >
          <span>RUN</span><i class="fas fa-play"></i>
        </button>
        <CodeMirror className="CodeMirror"
          value={this.props.value}
          onBeforeChange={this.onBeforeChange.bind(this)}
          editorDidMount={editor => { this.CodemirrorInstance = editor; window.codemirror = editor;}}
          options={{
            mode: 'xml',
            xmlHint: true,
            autoCloseTags: true,
            lineNumbers: true,
            tabSize: 2,
            hintOptions: { schemaInfo: this.schema },
            extraKeys: {
              "'<'": (cm) => this.completeAfter(cm),
              "'/'": (cm) => this.completeIfAfterLt(cm),
              "'='": (cm) => this.completeIfInTag(cm, '='),
              "'{'": (cm) => this.completeIfInTag(cm, '{'),
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
    if (pred) predResult = pred();
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
      let markupExtension = inner.tagName != null && (key === '{' || key === '=') && cm.getTokenAt(currentCursor).type === "string";
      if (replaceWithAttrValue) {
        cm.replaceRange('=""', { line: currentCursor.line, ch: currentCursor.ch })
        cm.setCursor({ line: currentCursor.line, ch: currentCursor.ch + 2 })
      }
      if(markupExtension){
        if (key === '{' ){
          cm.replaceRange('{}', { line: currentCursor.line, ch: currentCursor.ch })
          cm.setCursor({ line: currentCursor.line, ch: currentCursor.ch + 1 })
          return { hint: inner.tagName, skipkey: true };
        }
        return { hint: inner.tagName, skipkey: false };
      }
      return { hint: inner.tagName, skipkey: replaceWithAttrValue };
    });
  }

  onBeforeChange(editor, data, value) {
    window.codemirror = editor;
    this.props.updateData('xaml', value)
  }

  runButtonPressed() {
    this.props.runCode()
  }

}

export default CodeMirrorComponent;