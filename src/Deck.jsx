import React, {Component} from 'react';
import ButtonDesc from "./ButtonDesc";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        };
    }
    render() {
        return (
            <div>
                <div
                    className="deck"
                    title="click to open this deck"
                    style={this.state.item.objects.length > 0 ? {background: "linear-gradient(45deg," +
                            " white 85%, orange 85%)"} : {background: "linear-gradient(45deg, white 85%, #FFDE9F 85%)"}}
                    onClick={() => {
                        this.props.onShowCards(this.state.item);
                    }}>
                    <p className="amount" title="how many cards are in this deck">
                        {this.props.item.objects.length || ""}
                    </p>
                    <h2>{this.state.item.name}</h2>
                    {this.props.editMode ?
                        <div className="editButtonsSection">
                            <button
                                className="editButton allTheButtons"
                                title="edit the card"
                                onClick={event => {
                                event.stopPropagation();
                                this.props.editedCard(this.state.item);
                            }}
                            >
                                edit
                            </button>
                            <button
                                className="deleteButton allTheButtons"
                                title="delete the card"
                                onClick={event => {
                                    event.stopPropagation();
                                    this.props.deleteIt(this.state.item)}}
                            >
                                delete
                            </button>
                        </div>
                    : ""}
                    <ButtonDesc
                        item={this.state.item}
                    />
                </div>
            </div>
        );
    }
}

export default Deck;