import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import './styles/style.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

let verticalHandler = document.getElementById('verticalSplitter');
let horizontalHandler = document.getElementById('dataContextSplitter');

let horizontalDragging, verticalDragging = false;

document.addEventListener('mousedown', function (e) {
    if (e.target === verticalHandler) {
        verticalDragging = true;
    } else if (e.target === horizontalHandler) {
        if (!document.getElementById('dataContextContainer').classList.contains('collapsed'))
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
        document.getElementById('xamlEditorContainer').style.height = (e.clientY - 48) + 'px';
        let bottomHeight = Math.max( 30, window.innerHeight - e.clientY ) + 'px';
        if (bottomHeight === '30px'){
            document.getElementById('dataContextContainer').classList.add('collapsed');
            document.getElementById('dataContextArrow').style.transform = 'rotate(180deg)'
        }else{
            document.getElementById('dataContextContainer').classList.remove('collapsed');
        }
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
    _privateError.apply(console, arguments);
    var args = Array.prototype.slice.call(arguments);
    for (let i = 0; i < args.length; i++) {
        let node = document.createElement("div");
        if (args[i].includes("[NOESIS/")) {
            let text = args[i];
            let lineNumber = text.substring(text.lastIndexOf("(") + 1, text.lastIndexOf(")"));
            let error = document.createTextNode(text.substring(text.indexOf(">") + 1));
            let image = document.createElement("img");
            image.src = "images/cross.png";
            node.appendChild(image);
            node.appendChild(error);
            node.classList.add('error');
            document.getElementById("errorLog").appendChild(node);
            let errorLine = document.getElementsByClassName('CodeMirror-line')[lineNumber-1]
            //errorLine.style.textDecoration = 'underline red';
            errorLine.style.backgroundColor = 'rgba(192, 48, 48, 0.3)';
        }
    }
}

serviceWorker.unregister();
