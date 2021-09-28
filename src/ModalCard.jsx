import React, {Component} from "react";

class ModalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card,
            showedDesc: false
        };
    }
    showDesc = event => {
        event.stopPropagation();
        if (!this.state.showedDesc) {
            this.setState({showedDesc: true});
        } else {
            this.setState({showedDesc: false});
        }
    };
    toCloseModal = event => {
        event.stopPropagation();
        this.props.closeModal();
    };
    toNextModalCard = event => {
        event.stopPropagation();
        this.props.nextModalCard();
    };
    render() {
        return (
            <div className="modal-layer" onClick={this.toCloseModal}>
                <div className="modalCard" onClick={this.showDesc}>
                    <span className="closeSign" onClick={this.toCloseModal}>&#10006;</span>
                    <div className="modalHeader">
                        <button className="prevModal">&larr;</button>
                        <h2>{this.state.card.name}</h2>
                        <button className="nextModal" onClick={this.toNextModalCard}>&rarr;</button>
                    </div>
                    <div className="desc">
                        {this.state.showedDesc ? this.state.card.description : ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalCard;