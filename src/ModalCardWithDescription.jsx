import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";

class ModalCardWithDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card
        };
    }
    closeDesc = event => {
        event.stopPropagation();
        this.props.showDesc(null);
    };
    render() {
        return (
            <div
                className="modal-layer"
                title="click anywhere to close"
                onClick={this.closeDesc}
            >
                <CSSTransition
                    in={this.props.animate}
                    timeout={{
                        appear: 400,
                        enter: 400,
                        exit: 800
                    }}
                    classNames={"cardwdcomp"}
                    appear={true}
                    unmountOnExit={true}
                >
                    <div className="modalCard"
                         style={{position: "absolute", top: `${this.props.positionY}`, left: `${this.props.positionX}`}}
                         title="card description"
                         onClick={event => {
                             event.stopPropagation();
                             event.preventDefault();
                         }}
                    >
                    <span
                        className="closeSign"
                        title="close"
                        onClick={this.closeDesc}
                    >
                        &#10006;
                    </span>
                        <div className="descHeader">
                            {this.state.card.name}
                        </div>
                        <div className="desc">
                            {this.state.card.description}
                        </div>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}

export default ModalCardWithDescription;