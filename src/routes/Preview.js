import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import PreviewComponent from '../components/Preview';

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
            <PreviewComponent 
                showLink={this.props.showLink}
                hash={this.state.hash}
            />
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
        try {
            if (this.state.fetched) {
                window.Module.ccall('UpdateXaml', null, ['string'], [this.state.xaml]);
            } else {
                setTimeout(() => { this.runCode(); }, 800);
            }
        } catch (err) {
            setTimeout(() => { this.runCode(); }, 800);
        }
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
                alert("Could not find Gist with given ID.")
                this.setState({
                    xaml: default_xaml,
                    hash: hash,
                    fetched: true
                })
            })
    }

}

export default withRouter(Preview);

