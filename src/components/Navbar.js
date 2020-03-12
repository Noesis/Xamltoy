import React from 'react';

export default function Navbar(props) {
  let resetUrl = process.env.PUBLIC_URL + '/' + props.hash;
  return (
    <div className="navbar">

      <a className="navbar-left" href="https://www.noesisengine.com/">
        <img className="logo" src='https://cdn.staticaly.com/gh/Noesis/Noesis.github.io/1c36aaf/NoesisGUI/Web/images/noesis-gui-logo.svg' alt="NoesisGUI" ></img>
        <p>xaml<span>toy</span></p>
      </a>

      <div className="navbar-centered">
        {props.title.length > 0 &&
          <a href={'https://gist.github.com/' + props.hash} title="View on Gist">
            <div className='title'>
              <p>{props.title}</p>
              <i className='fas fa-external-link-alt title-link' alt="View on Gist"></i>
            </div>
          </a>
        }
      </div>

      <div className="navbar-right">
        <div className='desktop'>
          <a href={process.env.PUBLIC_URL + '/'}>New</a>
          <a href={resetUrl}>Reset</a>
          <div className="dropdown">
            <button className="dropbtn" id="samples">SAMPLES</button>
            <div className="dropdown-content" id="dropdown">
              <a href={process.env.PUBLIC_URL + "/2e4fb7d5143b4505992b33fec34d0592"}>Hello World</a>
              <a href={process.env.PUBLIC_URL + "/7899ac1bd7ba837db023409bc0f43c3f"}>Buttons</a>
              <a href={process.env.PUBLIC_URL + "/44229263f9a6c22624d1f7e993f34bf4"}>Login</a>
              <a href={process.env.PUBLIC_URL + "/61c071a0b3a34ff82dfb0e2b96e30f94"}>Quest Log</a>
              <a href={process.env.PUBLIC_URL + "/29a81720a5a5daa66725429966240a60"}>Localization</a>
              <a href={process.env.PUBLIC_URL + "/ea9e784e9f6ce5787f2b8c8b8666da25"}>Text</a>
              <a href={process.env.PUBLIC_URL + "/012449ce12e6c2ad5cfa09020add4791"}>Shadow</a>
              <a href={process.env.PUBLIC_URL + "/e4c6986363164dabcb6e0ea8d8d96265"}>Lottie</a>
              <a href={process.env.PUBLIC_URL + "/8ab948fb3b5a3edaaee5bb6cd7017a8b"}>3D</a>
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className='fas fa-bars dropbtn-mobile' id='hamburger'></button>
          <div className="dropdown-content dropdown-content-mobile" id="dropdown-mobile">
            <a href={process.env.PUBLIC_URL + '/'}>New</a>
            <a href={resetUrl}>Reset</a>
            <a href={process.env.PUBLIC_URL + "/2e4fb7d5143b4505992b33fec34d0592"} className='sample-mobile'>Hello World</a>
            <a href={process.env.PUBLIC_URL + "/7899ac1bd7ba837db023409bc0f43c3f"} className='sample-mobile'>Buttons</a>
            <a href={process.env.PUBLIC_URL + "/44229263f9a6c22624d1f7e993f34bf4"} className='sample-mobile'>Login</a>
            <a href={process.env.PUBLIC_URL + "/61c071a0b3a34ff82dfb0e2b96e30f94"} className='sample-mobile'>Quest Log</a>
            <a href={process.env.PUBLIC_URL + "/29a81720a5a5daa66725429966240a60"} className='sample-mobile'>Localization</a>
            <a href={process.env.PUBLIC_URL + "/ea9e784e9f6ce5787f2b8c8b8666da25"} className='sample-mobile'>Text</a>
            <a href={process.env.PUBLIC_URL + "/012449ce12e6c2ad5cfa09020add4791"} className='sample-mobile'>Shadow</a>
            <a href={process.env.PUBLIC_URL + "/e4c6986363164dabcb6e0ea8d8d96265"} className='sample-mobile'>Lottie</a>
            <a href={process.env.PUBLIC_URL + "/8ab948fb3b5a3edaaee5bb6cd7017a8b"} className='sample-mobile'>3D</a>
          </div>
        </div>
      </div>

    </div>
  )
}