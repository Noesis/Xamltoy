import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/addon/edit/closebrackets');
require('codemirror/mode/javascript/javascript.js');

class ContextEditor extends React.Component {

  render() {
    return (
      <div id="dataContextContainer" className="collapsed">
        <div className="dataContextTitleBar" onClick={this.collapseArrowPressed}>
          <p>DataContext</p>
          <img src='images/arrow.png' id="dataContextArrow" alt="open"></img>
        </div>
        <CodeMirror className="CodeMirror datacontext" 
          value={this.props.value}
          onBeforeChange={this.onChange.bind(this)}
          options={{
            mode: 'javascript',
            autoCloseBrackets: true,
            lineNumbers: true,
            tabSize: 2,
            extraKeys: {
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

  onChange(editor, data, value) {
    this.props.updateData('context', value)
  }

  collapseArrowPressed = () => {
    if (document.getElementById('dataContextContainer').classList.contains('collapsed')){
      document.getElementById('dataContextContainer').classList.remove('collapsed');
      document.getElementById('dataContextSplitter').classList.add('canScroll');
      document.getElementById('dataContextContainer').style.height = '50%'
      document.getElementById('xamlEditorContainer').style.height = '50%'
      document.getElementById('dataContextArrow').style.transform = 'rotate(0deg)'
    } else {
      document.getElementById('dataContextContainer').classList.add('collapsed');
      document.getElementById('dataContextSplitter').classList.remove('canScroll');
      document.getElementById('xamlEditorContainer').style.height = '100%'
      document.getElementById('dataContextContainer').style.height = '30px'
      document.getElementById('dataContextArrow').style.transform = ''
    }
  }

}

export default ContextEditor;
