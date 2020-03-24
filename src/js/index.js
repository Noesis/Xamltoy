let leftWidth = window.innerWidth / 2;
let rightWidth = window.innerWidth - leftWidth - 1;
let editorWidthRatio = leftWidth / window.innerWidth;
let runButton = document.getElementById('run-button');
let verticalSplitter = document.getElementById('verticalSplitter');
let editorSkeleton = document.getElementById('editorSkeleton');
let errorLog = document.getElementById("errorLog");
let editorBoxLeft = document.getElementById('editorBoxLeft');
let editorBoxRight = document.getElementById('editorBoxRight');
let canvas = document.getElementById("canvas");
let resolutionMeter = document.getElementById('resolution');
let fpsMeter = document.getElementById('frames');
let sampleButton = document.getElementById('samples');
let sampleDropdown = document.getElementById("dropdown");
let sampleDropdownMobile = document.getElementById("dropdown-mobile");
let hamburgerButton = document.getElementById('hamburger');
let batchesButton = document.getElementById('batches');
let overdrawButton = document.getElementById('overdraw');
let ppaaButton = document.getElementById('ppaa');
let collapseXamlButton = document.getElementById('collapseXaml');
let verticalDragging = false;

resizeEditor();
resetCursor();

sampleButton.onclick = () => {
    sampleDropdown.classList.toggle("show");
}

hamburgerButton.onclick = () => {
    sampleDropdownMobile.classList.toggle("show");
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

ppaaButton.onclick = () => {
    if (!ppaaButton.classList.contains('button-active')) {
        ppaaButton.classList.add('button-active');
    }else{
        ppaaButton.classList.remove('button-active');
    } 
    updateViewFlags();
}

collapseXamlButton.onclick = () => {
    if (!collapseXamlButton.classList.contains('collapsed')) {
        collapseXamlButton.classList.add('collapsed');
        editorBoxLeft.style.height= '32px';
        editorBoxRight.style.height= '100%';
        window.dispatchEvent(new Event('resize'));
        runButton.style.display = 'none';
    }else{
        collapseXamlButton.classList.remove('collapsed');
        editorBoxLeft.style.height= '';
        editorBoxRight.style.height= '50%';
        window.dispatchEvent(new Event('resize'));
        runButton.style.display = 'block';
    } 
}

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

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        if (sampleDropdown.classList.contains('show')) {
            sampleDropdown.classList.remove('show');
        }
    }
}

window.addEventListener('resize', () => {
    leftWidth = Math.round(window.innerWidth * editorWidthRatio);
    rightWidth = window.innerWidth - leftWidth - 1;
    editorWidthRatio = Math.min(0.8, leftWidth / window.innerWidth);
    resizeEditor();
    if(window.innerWidth > 600){
        collapseXamlButton.classList.remove('collapsed');
        editorBoxLeft.style.height= '';
        editorBoxRight.style.height= '';
    }
});

function updateViewFlags(){
    let flags = 0 |
        (batchesButton.classList.contains('button-active') ? 2 : 0) |
        (overdrawButton.classList.contains('button-active') ? 4 : 0) |
        (ppaaButton.classList.contains('button-active') ? 16 : 0);
    window.Module.ccall('SetViewFlags', null, ['number'], [flags]);
}

function resetCursor() {
    editorSkeleton.style.pointerEvents = 'auto';
    editorSkeleton.style.cursor = 'auto';
}

function handleVerticalResize(e) {
    leftWidth = Math.round(e.clientX);
    rightWidth = window.innerWidth - leftWidth - 1;
    editorWidthRatio = Math.min(0.8, leftWidth / window.innerWidth);
    window.dispatchEvent(new Event('resize'));
}

function resizeEditor() {
    editorSkeleton.style.pointerEvents = 'none';
    editorSkeleton.style.cursor = 'ew-resize';
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

