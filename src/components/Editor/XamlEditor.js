import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/xml/xml.js');

class XamlEditor extends React.PureComponent {

  constructor(props) {
    super(props);
    this.CodeMirrorRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <button 
          title="Run with ctrl/cmd + s or Alt + Enter" 
          type="button" 
          id="run-button" 
          className="runButton" 
          onClick={this.runButtonPressed.bind(this)}
        >
          <img src="images/play.png" alt="RUN"></img>RUN
        </button>
        <CodeMirror className="CodeMirror resizable"
          ref={this.CodeMirrorRef}
          value={this.props.value}
          onBeforeChange={this.onChange.bind(this)}
          options={{
            mode: 'xml',
            autoCloseTags: true,
            lineNumbers: true
          }}
        />
      </React.Fragment>
    )
  }

  onChange(editor, data, value) {
    this.props.updateData('xaml', value)
  }

  runButtonPressed() {
    this.props.runCode()
  }

  componentDidMount() {
    let _privateError = console.error;
    console.error = function () {
      _privateError.apply(console, arguments);
      var args = Array.prototype.slice.call(arguments);
      for (let i = 0; i < args.length; i++) {
        let node = document.createElement("div");
        if (args[i].includes("[NOESIS/")) {
          let text = args[i];
          //let lineNumber = text.substring(text.lastIndexOf("(") + 1, text.lastIndexOf(")"));
          let error = document.createTextNode(text);
          let image = document.createElement("img");
          image.src = "images/cross.png";
          node.appendChild(image);
          node.appendChild(error);
          node.classList.add('error');
          document.getElementById("errorLog").appendChild(node);
          console.log(this.CodeMirrorRef)
          this.CodeMirrorRef.markText({ line: 2, ch: 26 }, { className: "errorLine" })
        }
      }
    }
  }

}

export default XamlEditor;
