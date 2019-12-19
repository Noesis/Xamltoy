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
          ref={this.CodeMirrorRef}
          value={this.props.value}
          onBeforeChange={this.onChange.bind(this)}
          options={{
            mode: 'xml',
            autoCloseTags: true,
            lineNumbers: true
          }}
        />
      </div>
    )
  }

  onChange(editor, data, value) {
    this.props.updateData('xaml', value)
  }

  runButtonPressed() {
    this.props.runCode()
  }

}

export default XamlEditor;
