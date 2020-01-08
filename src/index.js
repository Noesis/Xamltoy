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
    document.getElementById('editorSkeleton').style.pointerEvents = 'auto'; 
    document.getElementById('root').style.cursor = 'auto';
});

function handleVerticalResize(e) {
    document.getElementById('editorSkeleton').style.pointerEvents = 'none';
    document.getElementById('root').style.cursor = 'ew-resize';
    let ratio = e.clientX / window.innerWidth;
    document.getElementById('editorBoxLeft').style.flexBasis = ratio * 100 + '%';
    document.getElementById('editorBoxRight').style.flexBasis = 100 - ratio * 100 + '%';
    global.dispatchEvent(new Event('resize'));
}

function handleHorizontalResize(e) {
    document.getElementById('editorSkeleton').style.pointerEvents = 'none';
    document.getElementById('root').style.cursor = 'ns-resize';
    let ratio = 1-(e.clientY-47) / (window.innerHeight-80);
    document.getElementById('xamlEditorContainer').style.height = 100 - ratio * 100 + '%';
    document.getElementById('dataContextContainer').style.height = ratio * 100 + '%';
    if (ratio < 0) {
        document.getElementById('xamlEditorContainer').style.height = '100%';
        document.getElementById('dataContextContainer').classList.add('collapsed');
        document.getElementById('dataContextSplitter').classList.remove('canScroll');
        document.getElementById('dataContextArrow').style.transform = 'rotate(180deg)';
        horizontalDragging = false;
    } else {
        document.getElementById('dataContextContainer').classList.remove('collapsed');
        document.getElementById('dataContextSplitter').classList.add('canScroll');
    }
}

function generateErrorMessage(log) {
    document.getElementById('root').style.userSelect = 'auto';
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

let _privateError = console.error;
console.error = function () {
    _privateError.apply(console, arguments);
    var logs = Array.prototype.slice.call(arguments);
    logs.forEach(line => {
        if (line.includes("[NOESIS/E]")) {
            let lineNumber = line.substring(line.lastIndexOf("(") + 1, line.lastIndexOf(")"));
            generateErrorMessage(line);
            hightlightLine(lineNumber - 1);
        }
    });
}

serviceWorker.unregister();
