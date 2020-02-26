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
                <footer id="leftFooter">
                    <span className="left" id='show-faq'>Help</span>
                    <a href="https://www.noesisengine.com/forums/index.php"><span className="left">Send feedback</span></a>
                </footer>
            </div>
            <div className="splitter verticalSplitter" id="verticalSplitter"></div>
            <div className="editorBox" id="editorBoxRight">
                <canvas id="canvas" tabIndex="-1"></canvas>
                <div className="errorLog" id="errorLog"></div>
                <footer id="rightFooter">
                    <span id="resolution" className="left"></span>
                    <span id="frames" className="left"></span>
                    <span className="center">
                        <img id='brush' src='images/brush.svg' alt="Batches" title="Batches"></img>
                        <img id='photo' src='images/photo.svg' alt="Overdraw" title="Overdraw" ></img>
                        <img id='vibrate' src='images/vibrate.svg' alt="PPAA" title="PPAA" className="hide" ></img>
                    </span>
                    <span className="right">Based on NoesisGUI 3.0</span>
                </footer>
            </div>
        </div>
    );
}
