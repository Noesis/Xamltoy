import React from 'react';

export default function Navbar(props) {
  let resetUrl = process.env.PUBLIC_URL + '/' + props.hash;
  return (
    <div className="navbar">

      <a className="navbar-left" href="https://www.noesisengine.com/">
        <img className="logo" src='images/logo.svg' alt="logo" ></img>
        <p>xaml<span>toy</span></p>
      </a>

      <div className="navbar-centered">
        {props.title.length > 0 &&
          <a href={'https://gist.github.com/' + props.hash} title="View on Gist">
            <div className='title'>
              <p>{props.title}</p>
              <img className='title-link' src='https://www.noesisengine.com/xamltoy/images/link.png' alt="View on Gist"></img>
            </div>
          </a>
        }
      </div>

      <div className="navbar-right">
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
          </div>
        </div>
      </div>

    </div>
  )
}