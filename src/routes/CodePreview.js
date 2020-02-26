import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/src/modes.js');

const server_addr = "https://api.github.com/gists/"
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
            fetched: false,
            hash: "",
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.showLink &&
                    <a target="_parent" href={process.env.PUBLIC_URL + '/' + this.state.hash} title="Edit on xamltoy">
                        <div className="link linkCode">
                            <img src='../images/link.png' alt="Edit on xamltoy"></img>
                        </div>
                    </a>
                }
                <CodeMirror className="CodeMirror"
                    value={this.state.xaml}
                    onBeforeChange={editor => { window.codemirror = editor }}
                    editorDidMount={editor => { this.CodemirrorInstance = editor; window.codemirror = editor; }}
                    options={{
                        mode: 'xml',
                        lineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </React.Fragment>
        )
    }

    componentDidMount() {
        let hash = this.props.match.params.hash;
        if (!hash) {
            this.setState({
                fetched: true,
                xaml: default_xaml
            })
        } else {
            this.fetchData(hash)
        }
    }

    onBeforeChange(editor, data, value) {
        window.codemirror = editor;
    }

    fetchData(hash) {
        axios.get(server_addr + hash)
            .then((response) => {
                this.setState({
                    xaml: response.data.files["Main.xaml"].content,
                    hash: hash,
                    fetched: true
                })
            })
            .catch((err) => {
                console.log(err);
                alert("Could not find Gist with given ID.")
                window.history.pushState({}, "", "./"); // removes hash from url
                this.setState({
                    xaml: default_xaml,
                    hash: hash,
                    fetched: true
                })
            })
    }

}

export default withRouter(CodePreview);

