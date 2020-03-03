import React from 'react';

export default function Faq(props) {
  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <div className="header">
          <span className="close">&times;</span>
          <h2>Help</h2>
        </div>
        <div className="content">
          <h3>Sharing</h3>
          <p>Xamltoy uses <strong><a href="https://gist.github.com/">GitHub gists</a></strong> to publicly share your creations.</p>
          <p>It looks for a file named <strong>Main.xaml</strong> in each gist. That xaml file can reference other local resources from the gist (xamls, fonts and images).</p>
          <p>To share a xaml with others you should do the following:</p>
          <ol>
            <li>Create a gist with Main.xaml and any other resources you need.</li>
            <li>Append gist ID to xamltoy url. For example, to view <a href="https://gist.github.com/2e4fb7d5143b4505992b33fec34d0592">gist.github.com/2e4fb7d5143b4505992b33fec34d0592</a> in xamltoy, use the URL <a href="http://www.noesisengine.com/xamltoy/2e4fb7d5143b4505992b33fec34d0592">www.noesisengine.com/xamltoy/2e4fb7d5143b4505992b33fec34d0592</a>.</li>
          </ol>
          <p>Some example gists:</p>
          <ul>
            <li><a href="https://gist.github.com/7899ac1bd7ba837db023409bc0f43c3f">gist.github.com/7899ac1bd7ba837db023409bc0f43c3f</a></li>
            <li><a href="https://gist.github.com/44229263f9a6c22624d1f7e993f34bf4">gist.github.com/44229263f9a6c22624d1f7e993f34bf4</a></li>
            <li><a href="https://gist.github.com/61c071a0b3a34ff82dfb0e2b96e30f94">gist.github.com/61c071a0b3a34ff82dfb0e2b96e30f94</a></li>
            <li><a href="https://gist.github.com/29a81720a5a5daa66725429966240a60">gist.github.com/29a81720a5a5daa66725429966240a60</a></li>
          </ul>
          <p>Happy sharing!</p><br/>
          <h3>Keyboard Shortcuts</h3>
          <p>While editing a xaml in xamltoy press <strong>Ctrl+S</strong> or <strong>Alt+Enter</strong> to run it in the preview window.</p>
        </div>
      </div>
    </div>
  )
}