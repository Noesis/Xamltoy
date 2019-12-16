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
        <a href={props.gistUrl}>{props.title}</a>
      </div>

      <div className="navbar-right">
        <a href={process.env.PUBLIC_URL + '/'}>New</a>
        <a href={resetUrl}>Reset</a>
        <a href={process.env.PUBLIC_URL}>Samples</a>
      </div>

    </div>
  )
}