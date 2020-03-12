let updateFrameCounter = (fps) => {
    if (document.getElementById('frames')) document.getElementById('frames').innerHTML = fps.toFixed(1) + ' fps';
  }
  let updateResolution = (width, height) => {
    if (document.getElementById('resolution')) document.getElementById('resolution').innerHTML = width + ' x ' + height;
  }
  Module = {
    canvas: (function () {
      let canvas = document.getElementById('canvas');
      canvas.addEventListener("webglcontextlost",
        function (e) {
          alert('WebGL context lost. You will need to reload the page.');
          e.preventDefault();
        }, false);
      window.canvas = canvas;
      return canvas;
    })(),
    postRun: (function () {
      document.dispatchEvent(new CustomEvent("Noesis Ready"));
    })
  }