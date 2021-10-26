import React, {Component} from 'react';
import ModalCardWithDescription from "./ModalCardWithDescription";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card,
            showedDesc: false,
            animate: false,
            positionX: 0,
            positionY: 0
        };
    }
    showDesc = event => {
        if (!this.state.showedDesc) {
            const parent = document.body.getBoundingClientRect();
            const element = event.target.getBoundingClientRect();
            const positionX = element.left - parent.left;
            const positionY = element.top - parent.top;
            this.setState({showedDesc: true, animate: true, positionX, positionY});
            console.log(positionX, positionY);
        } else {
            setTimeout(() => {
                this.setState({showedDesc: false});
            }, 700);
            this.setState({animate: false, positionX: 0, positionY: 0})

        }
    };
    render() {
        return (
            <div
                className="card"
                title="click to see a description"
                 onClick={event => {
                this.showDesc(event);
            }}
            >
                <h2>{this.state.card.name}</h2>
                {this.props.editMode ?
                    <div className="editButtonsSection">
                        <button
                            className="editButton allTheButtons"
                            onClick={event => {
                                event.stopPropagation();
                                this.props.editedCard(this.state.card);
                            }}
                        >
                            edit
                        </button>
                        <button
                            className="deleteButton allTheButtons"
                            onClick={event => {
                                event.stopPropagation();
                                this.props.deleteIt(this.state.card)}}
                        >
                            delete
                        </button>
                    </div>
                    : ""}
                {this.state.showedDesc ?
                    <ModalCardWithDescription
                        card={this.state.card}
                        showedDesc={this.state.showedDesc}
                        animate={this.state.animate}
                        showDesc={this.showDesc}
                        positionX={this.state.positionX}
                        positionY={this.state.positionY}
                    />
                    :
                    <div className="nameOfDeck" title="the deck of this card">
                        {this.state.card.deck}
                    </div>
                }
            </div>
        )
    }
}

export default Card;