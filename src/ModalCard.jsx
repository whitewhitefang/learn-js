import React, {Component} from "react";

class ModalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards,
            card: {},
            prevCard: [],
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
    escapeClose = event => {
        if (event.key === "Escape") {
            this.props.closeModal();
        }
    };
    getRandomCard = () => {
        const currRandom = Math.trunc(1 + Math.random() * (this.state.cards.length - 1));
        const card = this.state.cards[currRandom];
        this.setState({card, showedDesc: false});
    };
    nextModalCard = event => {
        event.stopPropagation();
        let cardArr = this.state.prevCard;
        cardArr.push(this.state.card);
        this.setState({prevCard: cardArr});
        this.getRandomCard();
    };
    prevModalCard = event => {
        event.stopPropagation();
        if (this.state.prevCard.length !== 0) {
            let cardArr = this.state.prevCard;
            let currCard = cardArr.pop();
            this.setState({card: currCard, prevCard: cardArr, showedDesc: false});
        }
    };
    componentDidMount() {
        if (!this.card) {
            this.getRandomCard();
        }
        document.addEventListener('keydown', this.escapeClose);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeClose);
    }
    render() {
        return (
            <div className="modal-layer" onClick={this.toCloseModal}>
                <div className="modalCard" title="click to see a description" onClick={this.showDesc}>
                    <span
                        className="closeSign"
                        title="close"
                        onClick={this.toCloseModal}
                    >
                        &#10006;
                    </span>
                    <div className="modalHeader">
                        <button
                            className="prevModal allTheButtons"
                            title="previous random card"
                            onClick={this.prevModalCard}
                        >
                            &larr;
                        </button>
                        <h2>{this.state.card.name}</h2>
                        <button
                            className="nextModal allTheButtons"
                            title="next random card"
                            onClick={this.nextModalCard}
                        >
                            &rarr;
                        </button>
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