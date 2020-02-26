import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

const server_addr = "https://api.github.com/gists/"
const default_xaml =
    `<Grid
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  
</Grid>`

class Preview extends React.Component {

    constructor(props) {
        super(props);
        this.runCode = this.runCode.bind(this)
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
                    <div className="link">
                        <img src='../images/link.png' alt="Edit on xamltoy"></img>
                    </div>
                </a>
            }
            <canvas
                id="canvas"
                className="fullscreen-canvas"
                tabIndex="-1"
                height={window.innerHeight}
                width={window.innerWidth}
            ></canvas>
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
        document.addEventListener("Noesis Ready", this.runCode);
    }

    runCode() {
        this.clearErrors();
        if (this.state.fetched){
            for (const [key, value] of Object.entries(this.state.resources)) {
                window.Module.ccall('LoadResource', null, ['string','array','number'], [key, value, value.length]);
            }
            this.setState({resources: {}});
            window.Module.ccall('UpdateXaml', null, ['string'], [this.state.xaml]);
        }else{
            setTimeout(() => { this.runCode(); }, 800);
        }
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

    clearErrors(){
        window.errorMarks.forEach(mark =>  mark.clear())
        window.errorMarks = [];
    }

}

export default withRouter(Preview);

