import React from 'react';
import CodeMirror from './CodeMirror';

export default function EditorWindow(props) {
    return (
        <div id="editorSkeleton">
            <div className="editorBox" id="editorBoxLeft">
                <CodeMirror
                    value={props.xaml} 
                    hash={props.hash} 
                    updateData={props.updateData}
                    runCode={props.runCode} 
                />
            </div>
            <div className="splitter verticalSplitter" id="verticalSplitter"></div>
            <div className="editorBox" id="editorBoxRight">
                <canvas id="canvas" tabIndex="-1"></canvas>
                <div className="errorLog" id="errorLog"></div>
                <footer id="rightFooter">
                    <span className="left">60.0 fps</span>
                    <span className="left">800 x 600</span>
                    <span className="right">Running on NoesisGUI v3.0</span>
                </footer>
            </div>
        </div>
    );
}
