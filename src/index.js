import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import './styles/style.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

let verticalHandler = document.getElementById('verticalSplitter');
let horizontalHandler = document.getElementById('dataContextSplitter');
let topHandler = document.getElementById('topHandler');
let selected = ""

let horizontalDragging, verticalDragging = false;

document.addEventListener('mousedown', function (e) {
    if (e.target === verticalHandler) {
        verticalDragging = true;
        selected = e.target;
    } else if (e.target === horizontalHandler || e.target === topHandler) {
        horizontalDragging = true;
        selected = e.target;
    }
});

document.addEventListener('mousemove', function (e) {
    let wrapper, box, pointerRelativePos;
    if (verticalDragging){
        wrapper = selected.closest('.editorSkeleton');
        box = wrapper.querySelector('.editorBox');
        pointerRelativePos = e.clientX;
        console.log(pointerRelativePos)
        box.style.width = (Math.max(0, pointerRelativePos - 8)) + 'px';
    } else if (horizontalDragging){
        wrapper = selected.closest('.editorBox');
        box = wrapper.querySelector('.dataContextContainer');
        pointerRelativePos = (window.innerHeight-e.clientY);
        console.log(pointerRelativePos)
        box.style.flexBasis = (Math.max(30, pointerRelativePos)) + 'px';
    }else{
        return false;
    }
});

document.addEventListener('mouseup', function (e) {
    verticalDragging = false;
    horizontalDragging = false;
});

serviceWorker.unregister();
