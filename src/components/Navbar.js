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
          <a href={props.gistUrl}>
            <div className='title'>
              <p>{props.title}</p>
              <img className='title-link' src='https://www.noesisengine.com/xamltoy/images/link.png' alt="See source code"></img>
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
            <a href="https://www.noesisengine.com/xamltoy/52f51ce1cb797c06099c532700cdaa6e">Buttons</a>
          </div>
        </div>
      </div>

    </div>
  )
}