import React from 'react';

export default function Preview(props) {
    return (
        <React.Fragment>
            {props.showLink &&
                <a target="_parent" href={process.env.PUBLIC_URL + '/' + props.hash} title="Edit on xamltoy">
                    <div className="link">
                        <img src='../images/link.png' alt="Edit on xamltoy"></img>
                    </div>
                </a>
            }
            <canvas
                id="canvas"
                className="fullscreen-canvas"
                tabIndex="-1"
                height={window.innerHeight}
                width={window.innerWidth}
            ></canvas>
        </React.Fragment>
    );
}