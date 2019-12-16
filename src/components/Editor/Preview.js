import React from 'react';

class Preview extends React.Component {

  render() {
    return (
      <div className="emscripten_border">
        <canvas className="emscripten" id="canvas" tabIndex="-1"></canvas>
      </div>
    )
  }

}

export default Preview;


