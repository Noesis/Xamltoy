import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import './styles/style.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

let horizontalDragging, verticalDragging = false;

document.addEventListener('mousedown', function (e) {
    let dataContextCollapsed = document.getElementById('dataContextSplitter').classList.contains('collapsed');
    verticalDragging = e.target === document.getElementById('verticalSplitter');
    horizontalDragging = e.target === document.getElementById('dataContextSplitter') && !dataContextCollapsed;
});

document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (verticalDragging) handleVerticalResize(e);    
    if (horizontalDragging) handleHorizontalResize(e);
});

document.addEventListener('mouseup', function (e) {
    verticalDragging = false;
    horizontalDragging = false;
});

let _privateError = console.error;
console.error = function () {
    _privateError.apply(console, arguments);
    var logs = Array.prototype.slice.call(arguments);
    logs.forEach( line => {
        if (line.includes("[NOESIS/E]")) {
            let lineNumber = line.substring(line.lastIndexOf("(") + 1, line.lastIndexOf(")"));
            generateErrorMessage(line);
            hightlightLine(lineNumber - 1);
        }
    });
}

function handleVerticalResize(e) {
    let rightWidth = Math.max(30, window.innerWidth - e.clientX);
    document.getElementById('editorBoxLeft').style.width = e.clientX + 'px';
    document.getElementById('editorBoxRight').style.width = rightWidth + 'px';
    global.dispatchEvent(new Event('resize'));
}

function handleHorizontalResize(e) {
    let bottomHeight = Math.max(62, window.innerHeight - e.clientY) + 'px';
    document.getElementById('dataContextContainer').style.height = bottomHeight;
    document.getElementById('xamlEditorContainer').style.height = (e.clientY - 47) + 'px';
    if (bottomHeight === '62px') {
        document.getElementById('dataContextContainer').classList.add('collapsed');
        document.getElementById('dataContextArrow').style.transform = 'rotate(180deg)';
        horizontalDragging = false;
    } else {
        document.getElementById('dataContextContainer').classList.remove('collapsed');
    }
}

function generateErrorMessage(log) {
    let node = document.createElement("div");
    let errorMessage = document.createTextNode(log.substring(log.indexOf(">") + 1));
    let icon = document.createElement("img");
    icon.src = "images/cross.png";
    node.appendChild(icon);
    node.appendChild(errorMessage);
    node.classList.add('error');
    document.getElementById("errorLog").appendChild(node);
}

function hightlightLine(lineNumber) {
    let errorLine = document.getElementsByClassName('CodeMirror-line')[lineNumber]
    errorLine.style.backgroundColor = 'rgba(192, 48, 48, 0.3)';
}

serviceWorker.unregister();
