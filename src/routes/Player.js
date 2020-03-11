import React from 'react';
import Navbar from '../components/Navbar';
import Editor from '../components/Editor';
import Faq from '../components/Faq';
import { withRouter } from 'react-router';

import axios from 'axios';

const server_addr = "https://api.github.com/gists/"
const default_xaml =
`<Grid
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  
</Grid>`
const default_context = 
`{
    message: "Welcome to NoesisGUI XAMLTOY!",
    tips: [
        "you can bind two-way to the Data Context"
        "you can click ctrl+s to run the code"
    ]
}`

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this)
        this.runCode = this.runCode.bind(this)
        this.state = {
            xaml: "Loading...",
            resources: {},
            fetched: false,
            hash: "",
            gistUrl: "https://gist.github.com/",
            title: ""
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar
                    title={this.state.title}
                    hash={this.state.hash}
                    gistUrl={this.state.gistUrl}
                />
                <Editor onKeyDown={this.handleKeyDown}
                    runCode={this.runCode}
                    updateData={this.updateData}
                    xaml={this.state.xaml}
                    context={this.state.context}
                    hash={this.state.hash}
                />
                <Faq/>
            </React.Fragment>
        );
    }

    componentDidMount() {
        let hash = this.props.match.params.hash;
        if (!hash) {
            this.setState({
                fetched: true,
                xaml: default_xaml,
                context: default_context
            })
        } else {
            this.fetchData(hash)
        }
        document.addEventListener("keydown", this.handleKeyDown); // Handle keyboard shortcuts
        document.addEventListener("Noesis Ready", this.runCode);
        document.getElementById('editorBoxRight').prepend(document.getElementById('canvas'))
    }

    runCode() {
        this.clearErrors();
        if (this.state.fetched){
            for (const [key, value] of Object.entries(this.state.resources)) {
                window.Module.ccall('LoadResource', null, ['string','array','number'], [key, value, value.length]);
            }
            this.setState({resources: {}});
            document.getElementById('errorLog').innerHTML = ""; // Remove all previous errors
            window.Module.ccall('UpdateXaml', null, ['string'], [this.state.xaml]);
        }else{
            setTimeout(() => { this.runCode(); }, 800);
        }
    }

    updateData(key, value){
        this.setState({
            [key]: value
        });
    }

    fetchData(hash) {
        axios.get(server_addr + hash,{
            headers:{ accept: 'application/vnd.github.VERSION.base64'}   
        })
        .then((response) => {
            let resources = {};
            Object.keys(response.data.files).forEach(fileName =>{
                if(fileName !== "Main.xaml"){
                    let byteChars = (atob(response.data.files[fileName].content));
                    let byteNumbers = new Array(byteChars.length);
                    for (let i = 0; i < byteChars.length; i++) {
                        byteNumbers[i] = byteChars.charCodeAt(i);
                    }
                    let byteArray = new Uint8Array(byteNumbers);
                    resources[fileName] = byteArray;
                } 
            });            
            this.setState({
                xaml: decodeURIComponent(escape(window.atob( response.data.files["Main.xaml"].content ))),
                resources: resources,
                gistUrl: "https://gist.github.com/" + response.data.owner.login + '/' + hash,
                title: response.data.description,
                hash: hash,
                fetched: true
            })
        })
        .catch((err) => {
            console.log(err);
            window.history.pushState({}, "", "./"); // removes hash from url
            this.setState({
                xaml: default_xaml,
                context: default_context,
                hash: hash,
                fetched: true
            })
        })
    }

    clearErrors(){
        window.errorMarks.forEach(mark =>  mark.clear())
        window.errorMarks = [];
    }

    handleKeyDown = (e) => {
        // ctrl/cmd + s
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
            e.preventDefault();
            this.runCode();
        }
        // alt + enter
        if ((window.navigator.platform.match("Mac") ? e.altKey : e.altKey) && e.keyCode === 13) {
            e.preventDefault();
            this.runCode();
        }
    }

}

export default withRouter(Player);

