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
                <div className="errorLog" id="errorLog"></div>
                <footer id="rightFooter">
                    <span id="resolution" className="left"></span>
                    <span id="frames" className="left"></span>
                    <span className="center">
                        <i id='batches' className='fas fa-paint-brush' alt="Batches" title="Batches"></i>
                        <i id='overdraw' className='fas fa-images' alt="Overdraw" title="Overdraw"></i>
                        <i id='collapseXaml' className='fas fa-caret-down' alt="Collapse XAML" title="Collapse XAML"></i>
                        <i id='ppaa'  className='fas fa-water button-active hide' alt="PPAA" title="PPAA"></i>
                    </span>
                    <span className="right">Based on NoesisGUI 3.0</span>
                </footer>
            </div>
        </div>
    );
}
