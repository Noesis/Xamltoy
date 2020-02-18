import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import './styles/style.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

let verticalDragging = false;
let leftWidth = window.innerWidth / 2;
let rightWidth = window.innerWidth - leftWidth - 1;
let editorWidthRatio = leftWidth / window.innerWidth;
window.errorMarks = [];

if (document.getElementById('editorSkeleton')) {

    let root = document.getElementById('root');
    let verticalSplitter = document.getElementById('verticalSplitter');
    let editorSkeleton = document.getElementById('editorSkeleton');
    let errorLog = document.getElementById("errorLog");
    let editorBoxLeft = document.getElementById('editorBoxLeft');
    let editorBoxRight = document.getElementById('editorBoxRight');
    let canvas = document.getElementById("canvas");

    resizeEditor();
    resetCursor();

    window.addEventListener('resize', () => {
        leftWidth = Math.round(window.innerWidth * editorWidthRatio);
        rightWidth = window.innerWidth - leftWidth - 1;
        editorWidthRatio = Math.min(0.8, leftWidth / window.innerWidth);
        resizeEditor();
    })

    document.addEventListener('mousedown', function (e) {
        verticalDragging = e.target === verticalSplitter;
    });

    document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (verticalDragging) handleVerticalResize(e);
        resetCursor();
    });

    document.addEventListener('mouseup', function (e) {
        verticalDragging = false;
        resetCursor();
    });

    document.addEventListener('mouseout', function (e) {
        resetCursor();
    });

    function resetCursor() {
        editorSkeleton.style.pointerEvents = 'auto';
        root.style.cursor = 'auto';
    }

    function handleVerticalResize(e) {
        leftWidth = Math.round(e.clientX);
        rightWidth = window.innerWidth - leftWidth - 1;
        editorWidthRatio = Math.min(0.8, leftWidth / window.innerWidth);
        window.dispatchEvent(new Event('resize'));
    }

    function resizeEditor() {
        editorSkeleton.style.pointerEvents = 'none';
        root.style.cursor = 'ew-resize';
        editorBoxLeft.style.width = leftWidth + 'px';
        editorBoxRight.style.width = rightWidth + 'px';
        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.width = editorBoxRight.clientWidth;
        canvas.height = editorBoxRight.clientHeight - 32;
    }

    function generateErrorMessage(log, lineNumber) {
        let node = document.createElement("div");
        let errorText = "";
        if (lineNumber) errorText = "Line " + lineNumber + log.substring(log.indexOf(")") + 1);
        else errorText = log.substring(log.indexOf("]") + 1);
        let errorMessage = document.createTextNode(errorText);
        let icon = document.createElement("img");
        root.style.userSelect = 'auto';
        icon.src = "images/cross.png";
        node.appendChild(icon);
        node.appendChild(errorMessage);
        node.classList.add('error');
        node.style.cursor = 'pointer';
        if (lineNumber) node.onclick = () => {
            window.codemirror.focus();
            window.codemirror.setCursor({
                line: lineNumber - 1,
                ch: window.codemirror.getLine(lineNumber - 1).length
            });
            var coord = window.codemirror.charCoords({ line: lineNumber - 1, ch: 0 }, "local");
            var middleHeight = window.codemirror.getScrollerElement().offsetHeight / 2;
            window.codemirror.scrollTo(coord.left, coord.top - middleHeight);
        }
        errorLog.appendChild(node);
    }

    function hightlightLine(lineNumber) {
        if (window.codemirror) window.errorMarks.push(
            window.codemirror.markText(
                { line: lineNumber, ch: 0 },
                { line: lineNumber, ch: 10000 },
                {
                    className: 'highlighted',
                    inclusiveLeft: true,
                    inclusiveRight: true
                })
        )
    }

    let _privateError = console.error;
    console.error = function () {
        _privateError.apply(console, arguments);
        var logs = Array.prototype.slice.call(arguments);
        logs.forEach(log => {
            if (log.includes("[NOESIS/E]")) {
                let lineNumber = log.substring(log.lastIndexOf("(") + 1, log.lastIndexOf(")"));
                generateErrorMessage(log, lineNumber);
                hightlightLine(lineNumber - 1);
            }
        });
    }
}

serviceWorker.unregister();
