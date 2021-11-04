import React from "react";

function About(props) {
    return (
        <div className="confirm-modal-layer">
            <div className="confirm-modal">
                    <span
                        className="closeSign"
                        title="close"
                        onClick={() => {
                            props.toAbout();
                        }}
                    >
                        &#10006;
                    </span>
                <div className="modalText">
                    <p>This program is a first brick in my programming wall.</p>
                    <p>Please, don`t judge too harshly.</p>
                </div>
                <div className="confirmModalButtons">
                    <button
                        className="confirm-no"
                        title="ok"
                        onClick={() => {
                            props.toAbout();
                        }}
                    >
                        ok
                    </button>
                </div>
            </div>
        </div>
    );
}

export default About;