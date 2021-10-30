import React from "react";

function ConfirmModal(props) {
    return (
            <div className="confirm-modal-layer">
                <div className="confirm-modal">
                    <span
                        className="closeSign"
                        title="close"
                        onClick={() => {
                            props.closeConfirmModal();
                        }}
                    >
                        &#10006;
                    </span>
                    <div className="modalText">
                        <p>{props.text}</p>
                    </div>
                    <div className="confirmModalButtons">
                        <button
                            className="confirm-yes"
                            title="yes"
                            onClick={() => {
                                props.reallyDelete();
                            }}
                        >
                            yes
                        </button>
                        <button
                            className="confirm-no"
                            title="no"
                            onClick={() => {
                                props.closeConfirmModal();
                            }}
                        >
                            no
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default ConfirmModal;