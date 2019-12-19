import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/addon/edit/closebrackets');
require('codemirror/mode/javascript/javascript.js');

class ContextEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataContextCollapsed: false
    };
  }

  render() {
    return (
      <div id="dataContextContainer">
        <div className="dataContextTitleBar" onClick={this.collapseArrowPressed}>
          <p>DataContext</p>
          <img src='images/arrow.png' id="dataContextArrow" alt="open"></img>
        </div>
        <CodeMirror className="CodeMirror" 
          value={this.props.value}
          onBeforeChange={this.onChange.bind(this)}
          options={{
            mode: 'javascript',
            autoCloseBrackets: true,
            lineNumbers: true
          }}
        />
      </div>
    )
  }

  onChange(editor, data, value) {
    this.props.updateData('context', value)
  }

  collapseArrowPressed = () => {
    let collapsed = this.state.dataContextCollapsed;
    if (collapsed) {
      document.getElementById('dataContextContainer').style.flexBasis = '50%'
      document.getElementById('xamlEditorContainer').style.height = '50%'
      document.getElementById('dataContextArrow').style.transform = ''
    } else {
      document.getElementById('xamlEditorContainer').style.height = '100%'
      document.getElementById('dataContextContainer').style.flexBasis = '30px'
      document.getElementById('dataContextArrow').style.transform = 'rotate(180deg)'
    }
    this.setState((state) => {
      return { dataContextCollapsed: !state.dataContextCollapsed }
    });
  }

}

export default ContextEditor;
