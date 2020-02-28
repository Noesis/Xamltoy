import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import './styles/style.css';
import * as serviceWorker from './serviceWorker';

serviceWorker.unregister();

ReactDOM.render(<Router />, document.getElementById('root'));

let verticalDragging = false;
let leftWidth = window.innerWidth / 2;
let rightWidth = window.innerWidth - leftWidth - 1;
let editorWidthRatio = leftWidth / window.innerWidth;
window.errorMarks = [];

if(document.getElementById('canvas')) {
    const script = document.createElement("script");
    script.src = process.env.PUBLIC_URL + "/assets/Gui.XamlToy.js";
    document.body.appendChild(script);
    window.Module = {
        canvas: (function () {
            let canvas = document.getElementById('canvas');
            canvas.addEventListener("webglcontextlost", 
            function (e) { 
                alert('WebGL context lost. You will need to reload the page.'); 
                e.preventDefault(); 
            }, false);
            return canvas;
        })(),
        postRun: (function () {
            document.dispatchEvent(new CustomEvent("Noesis Ready"));
        })
    }
}

if (document.getElementById('editorSkeleton')) {

    let root = document.getElementById('root');
    let verticalSplitter = document.getElementById('verticalSplitter');
    let editorSkeleton = document.getElementById('editorSkeleton');
    let errorLog = document.getElementById("errorLog");
    let editorBoxLeft = document.getElementById('editorBoxLeft');
    let editorBoxRight = document.getElementById('editorBoxRight');
    let canvas = document.getElementById("canvas");
    let sampleButton = document.getElementById('samples');
    let sampleDropdown = document.getElementById("dropdown");
    var modal = document.getElementById("modal");
    var faqButton = document.getElementById("show-faq");
    var closeButton = document.getElementsByClassName("close")[0];

    let batchesButton = document.getElementById('brush');
    let overdrawButton = document.getElementById('photo');
    let ppaButton = document.getElementById('vibrate');

    resizeEditor();
    resetCursor();

    sampleButton.onclick = () => {
        sampleDropdown.classList.toggle("show");
    }

    batchesButton.onclick = () => {
        if (!batchesButton.classList.contains('button-active')) {
            batchesButton.classList.add('button-active');
            overdrawButton.classList.remove('button-active');
        }else{
            batchesButton.classList.remove('button-active');
        } 
        updateViewFlags();
    }

    overdrawButton.onclick = () => {
        if (!overdrawButton.classList.contains('button-active')) {
            overdrawButton.classList.add('button-active');
            batchesButton.classList.remove('button-active');
        }else{
            overdrawButton.classList.remove('button-active');
        } 
        updateViewFlags();
    }

    ppaButton.onclick = () => {
        if (!ppaButton.classList.contains('button-active')) {
            ppaButton.classList.add('button-active');
        }else{
            ppaButton.classList.remove('button-active');
        } 
        updateViewFlags();
    }

    window.addEventListener('resize', () => {
        leftWidth = Math.round(window.innerWidth * editorWidthRatio);
        rightWidth = window.innerWidth - leftWidth - 1;
        editorWidthRatio = Math.min(0.8, leftWidth / window.innerWidth);
        resizeEditor();
    });

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

    function updateViewFlags(){
        
    }

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
        if (rightWidth < 450) {
            document.querySelector('#rightFooter .right').style.display = 'none';
            document.querySelector('#rightFooter .center').style.cssText = 'position: relative;float: right;transform: none;top: 0;left: 0;';
        } else {
            if (window.screen.width > 1000) {
                document.querySelector('#rightFooter .right').style.display = 'flex';
                document.querySelector('#rightFooter .center').style.cssText = '';
            }
        }
        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.width = editorBoxRight.clientWidth;
        canvas.height = editorBoxRight.clientHeight - 32;
    }

    function generateErrorMessage(log, lineNumber) {
        let node = document.createElement("div");
        let errorText = "";
        if (lineNumber && window.codemirror.getLine(lineNumber-1)) errorText = "Line " + lineNumber + log.substring(log.indexOf(")") + 1);
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
        try {
            if (window.codemirror.getLine(lineNumber)) {
                window.errorMarks.push(
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
        } catch (err) { console.err(err) }
    }

    let _privateError = console.error;
    console.error = function () {
        _privateError.apply(console, arguments);
        var logs = Array.prototype.slice.call(arguments);
        logs.forEach(log => {
            if (log.includes("[NOESIS/E]")) {
                let lineNumber = log.substring(log.indexOf("(") + 1, log.indexOf(")"));
                generateErrorMessage(log, lineNumber);
                hightlightLine(lineNumber - 1);
            }
        });
    }

    faqButton.onclick = function () {
        modal.style.display = "block";
    }

    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (!event.target.matches('.dropbtn')) {
            if (sampleDropdown.classList.contains('show')) {
                sampleDropdown.classList.remove('show');
            }
        }
    }
}

