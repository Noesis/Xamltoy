import React from 'react';

export default function Faq(props) {
  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <h2>Help</h2>
        <h3>Gist</h3>
        <p>You can load a xaml file from <a href="https://gist.github.com/">Github Gist</a> by appending a gist hash to the url. Notice that the Gist has to be public and contain at least a file named "Main.xaml". You can also add images and fonts to reference inside your xaml.</p>
        <h3>Keyboard Shortcuts</h3>
        <table>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ctrl/cmd + 'S'</td>
              <td>Save and run</td>
            </tr>
            <tr>
              <td>alt + Enter</td>
              <td>Save and run</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}