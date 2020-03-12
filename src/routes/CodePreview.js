import React from 'react';
import { withRouter } from 'react-router';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/src/modes.js');

const default_xaml =
    `<Grid
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  
</Grid>`

class CodePreview extends React.Component {

    constructor(props) {
        super(props);
        this.CodemirrorInstance = null;
        this.state = {
            xaml: "Loading...",
            title: "",
            fetched: false,
            hash: "",
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="codePreviewNavbar">
                    <p>{this.state.title}</p>
                    <a target="_parent" href={process.env.PUBLIC_URL + '/' + this.state.hash} title="Edit on xamltoy">
                        <p>RUN</p>
                        <i className="fas fa-play" alt="Edit on xamltoy"></i>
                    </a>
                </div>
                <div className="codePreviewCode">
                    <CodeMirror className="CodeMirror"
                        value={this.state.xaml}
                        onBeforeChange={editor => { window.codemirror = editor }}
                        editorDidMount={editor => { this.CodemirrorInstance = editor; window.codemirror = editor; }}
                        options={{
                            mode: 'xml',
                            lineNumbers: false,
                            tabSize: 2,
                        }}
                    />
                </div>
            </React.Fragment>
        )
    }

    componentDidMount() {
        document.getElementById('canvas').style.display = 'none';
        let hash = this.props.match.params.hash;
        if (!hash) {
            this.setState({
                fetched: true,
                xaml: default_xaml
            })
        }
        document.addEventListener("Gist fetched", this.fetchData.bind(this));
    }

    onBeforeChange(editor, data, value) {
        window.codemirror = editor;
    }

    fetchData() {     
        this.setState({
            xaml: decodeURIComponent(escape(window.atob( window.response.files["Main.xaml"].content ))),
            fetched: true,
            gistUrl: "https://gist.github.com/" + window.response.owner.login + '/' +  window.response.id,
            title: window.response.description,
            hash: window.response.id,
        })
    }

}

export default withRouter(CodePreview);

