import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import './styles/style.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

let verticalHandler = document.getElementById('verticalSplitter');
let horizontalHandler = document.getElementById('dataContextSplitter');
let topHandler = document.getElementById('topHandler');

let horizontalDragging, verticalDragging = false;

document.addEventListener('mousedown', function (e) {
    if (e.target === verticalHandler) {
        verticalDragging = true;
    } else if (e.target === horizontalHandler || e.target === topHandler) {
        horizontalDragging = true;
    }
});

document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (verticalDragging){
        document.getElementById('editorBoxLeft').style.width = e.clientX + 'px';
        let rightWidth = (Math.max(30, window.innerWidth - e.clientX)) ;
        document.getElementById('editorBoxRight').style.width = rightWidth + 'px';
        global.dispatchEvent(new Event('resize'));
    } else if (horizontalDragging){
        document.getElementById('dataContextContainer').style.flexBasis = ''
        document.getElementById('xamlEditorContainer').style.height = (e.clientY) + 'px';
        let bottomHeight = Math.max( 30, (Math.min((window.innerHeight), window.innerHeight - e.clientY)) ) + 'px';
        document.getElementById('dataContextContainer').style.height = bottomHeight;
    }else{
        return false; 
    }
});

document.addEventListener('mouseup', function (e) {
    verticalDragging = false;
    horizontalDragging = false;
});

let _privateError = console.error;
console.error = function () {
    console.log(document.getElementById("CodeMirror"))
    _privateError.apply(console, arguments);
    var args = Array.prototype.slice.call(arguments);
    for (let i = 0; i < args.length; i++) {
        let node = document.createElement("div");
        if (args[i].includes("[NOESIS/")) {
            let text = args[i];
            let lineNumber = text.substring(text.lastIndexOf("(") + 1, text.lastIndexOf(")"));
            let error = document.createTextNode(text);
            let image = document.createElement("img");
            image.src = "images/cross.png";
            node.appendChild(image);
            node.appendChild(error);
            node.classList.add('error');
            node.onclick = function(lineNumber) {
                window.location.hash = document.getElementsByClassName('CodeMirror-line')[lineNumber - 1];
            }
            document.getElementById("errorLog").appendChild(node);
            let errorLine = document.getElementsByClassName('CodeMirror-line')[lineNumber-1]
            //errorLine.style.textDecoration = 'underline red';
            errorLine.style.backgroundColor = 'rgba(192, 48, 48, 0.3)';
        }
    }
}

serviceWorker.unregister();
