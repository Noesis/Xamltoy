import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import './styles/style.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

let horizontalDragging, verticalDragging = false;
let leftWidth = window.innerWidth / 2;
let rightWidth = window.innerWidth - leftWidth - 1;
let editorWidthRatio = leftWidth/window.innerWidth;

resizeEditor();
resetCursor();

window.addEventListener('resize', () => {
    leftWidth = Math.round(window.innerWidth * editorWidthRatio);
    rightWidth = window.innerWidth - leftWidth - 1;
    editorWidthRatio = Math.min(0.8, leftWidth / window.innerWidth);
    resizeEditor();
})

document.addEventListener('mousedown', function (e) {
    let dataContextCollapsed = document.getElementById('dataContextSplitter').classList.contains('collapsed');
    verticalDragging = e.target === document.getElementById('verticalSplitter');
    horizontalDragging = e.target === document.getElementById('dataContextSplitter') && !dataContextCollapsed;
});

document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (verticalDragging) handleVerticalResize(e);    
    if (horizontalDragging) handleHorizontalResize(e);
    resetCursor();
});

document.addEventListener('mouseup', function (e) {
    if (horizontalDragging) checkIfDataContextCollapsed();
    horizontalDragging = false;
    verticalDragging = false;
    resetCursor();
});

document.addEventListener('mouseout', function (e) {
    resetCursor();
});

function resetCursor(){
    document.getElementById('editorSkeleton').style.pointerEvents = 'auto';
    document.getElementById('root').style.cursor = 'auto';
}

function handleVerticalResize(e) {
    console.log(editorWidthRatio)
    leftWidth = Math.round(e.clientX);
    rightWidth = window.innerWidth - leftWidth - 1;
    editorWidthRatio = Math.min(0.8,leftWidth / window.innerWidth);
    window.dispatchEvent(new Event('resize'));
    resizeEditor();
}

function handleHorizontalResize(e) {
    let editorWidthRatio = 1 - (e.clientY - 47) / (window.innerHeight - 80);
    document.getElementById('editorSkeleton').style.pointerEvents = 'none';
    document.getElementById('root').style.cursor = 'ns-resize';
    document.getElementById('xamlEditorContainer').style.height = 100 - editorWidthRatio * 100 + '%';
    document.getElementById('dataContextContainer').style.height = editorWidthRatio * 100 + '%';
}

function resizeEditor() {
    document.getElementById('editorSkeleton').style.pointerEvents = 'none';
    document.getElementById('root').style.cursor = 'ew-resize';
    document.getElementById('editorBoxLeft').style.width = leftWidth + 'px';
    document.getElementById('editorBoxRight').style.width = rightWidth + 'px';
    resizeCanvas();
}

function resizeCanvas() {
    let canvas = document.getElementById("canvas");
    canvas.width = document.getElementById('editorBoxRight').clientWidth;
    canvas.height = document.getElementById('editorBoxRight').clientHeight;
}

function checkIfDataContextCollapsed(){
    if (document.getElementById('dataContextContainer').clientHeight <= 30) {
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
    let node = document.createElement("div");
    let errorMessage = document.createTextNode(log.substring(log.indexOf(">") + 1));
    let icon = document.createElement("img");
    document.getElementById('root').style.userSelect = 'auto';
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
