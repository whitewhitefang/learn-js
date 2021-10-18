import React, {Component} from 'react';

class editExistingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: this.props.decks,
            cards: this.props.cards,
            editedCard: this.props.editedCard,
            cardName: "",
            classDeck: "",
            deckName: "",
            cardDeck: "",
            initialDeck: "",
            cardType: "",
            cardDescription: "",
            objects: [],
            warningMess: "",
            controls: ["cardName", "deckName", "cardDeck", "cardType", "cardDescription"],
            errors: {
                cardName: [],
                deckName: [],
                cardDeck: [],
                cardType: [],
                cardDescription: []
            }
        };
    }
    componentDidMount() {
        this.unpackCard(this.state.editedCard);
    }
    unpackCard = card => {
        if (card.classDeck === "deck") {
            this.setState({
                cardName: card.name,
                classDeck: card.classDeck,
                deckName: card.deck,
                cardType: card.type,
                cardDescription: card.description,
                objects: card.objects
            })
        } else {
            this.setState({
                cardName: card.name,
                classDeck: card.classDeck,
                cardDeck: card.deck,
                cardType: card.type,
                cardDescription: card.description
            })
        }
    };
    validate = controls => {
        let errors = {};
        this.state.controls.forEach(control => {
            errors[control] = [];
            switch (control) {
                case "cardName":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should give a name to this card.\n");
                    }
                    break;
                case "deckName":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should give new deck a name.\n");
                    }
                    break;
                case "cardDeck":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should select a deck.\n");
                    }
                    break;
                case "cardType":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should write a type for this item.\n");
                    }
                    break;
                case "cardDescription":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should add a description.\n");
                    }
                    break;
                default:
                    break;
            }
        });
        let mess = Object.keys(this.state.errors).map(control => {
            return this.state.errors[control].map(err => {
                return err;
            })
        });
        this.setState({errors, warningMess: mess});
    };
    isValid = () => {
        let valid = true;
        for (const err of Object.keys(this.state.errors)) {
            if (this.state.errors[err].length > 0) {
                valid = false;
            }
        }
        return valid;
    };
    toCloseModalEditForm = () => {
        this.props.modalToEditCard();
    };
    saveDeck = async(deck) => {
        await fetch(`http://localhost:5000/js/${deck.id}`, {
            method: "PUT",
            body: JSON.stringify(deck),
            headers: {
                "Content-type": "application/json"
            }
        });
        this.props.getAndUnpack();
        this.toCloseModalEditForm();
    };
    saveCard = async(card) => {
        let deck = this.state.decks.filter(item => item.name === this.state.editedCard.deck)[0];
        if (card.deck === this.state.editedCard.deck) {
            let arr = Array.from(deck.objects);
            let index = 0;
            for (const item of arr) {
                if (item.id === this.props.editedCard.id) {
                    index = arr.indexOf(item);
                }
            }
            card.id = this.props.editedCard.id;
            deck.objects = arr.splice(index, 1, card);
            await fetch(`http://localhost:5000/js/${deck.id}`, {
                method: "PUT",
                body: JSON.stringify(deck),
                headers: {
                    "Content-type": "application/json"
                }
            });
            this.setState({editedCard: {}});
        } else {
            let newDeck = this.state.decks.filter(item => item.name === this.state.cardDeck)[0];
            if (newDeck.objects.length === 0) {
                card.id = Number.parseInt(newDeck.id) + 0.1;
            } else {
                card.id = Number((Number.parseFloat(newDeck.objects[newDeck.objects.length - 1].id) + 0.01).toPrecision(4));
            }
            newDeck.objects.push(card);
            await fetch(`http://localhost:5000/js/${newDeck.id}`, {
                method: "PUT",
                body: JSON.stringify(newDeck),
                headers: {
                    "Content-type": "application/json"
                }
            });
            this.props.deleteCard(this.state.editedCard);
        }
        this.toCloseModalEditForm();
        this.props.getAndUnpack();
    };
    saveIt = event => {
        event.preventDefault();
        if (this.state.editedCard.classDeck === "deck") {
            this.validate(["cardName"]);
            if (this.isValid()) {
                const newDeck = {
                    name: this.state.cardName,
                    classDeck: this.state.editedCard.classDeck,
                    deck: this.state.cardName,
                    type: this.state.cardName,
                    description: this.state.cardDescription,
                    id: this.state.editedCard.id
                };
                const arrOfCards = Array.from(this.state.editedCard.objects);
                for (const obj of arrOfCards) {
                    obj.deck = newDeck.name;
                }
                newDeck.objects = arrOfCards;
                this.saveDeck(newDeck);
            }
        } else if (this.state.editedCard.classDeck === "card") {
            this.validate(["cardName", "cardDeck", "cardType", "cardDescription"]);
            if (this.isValid()) {
                const newCard = {
                    name: this.state.cardName,
                    classDeck: this.state.editedCard.classDeck,
                    deck: this.state.cardDeck,
                    type: this.state.cardType,
                    description: this.state.cardDescription
                };
                this.saveCard(newCard);
            }
        }
    };
    cardsInside = cards => {
        let items = "";
        for (let i = 0; i < cards.length; i++) {
            if (i < cards.length - 1) {
                items += cards[i].name + "\n";
            } else {
                items += cards[i].name;
            }
        }
        return items;
    };
    render() {
        return (
            <div className="modal-layer">
                <div className="modalForm">
                    <span className="closeSign" onClick={this.toCloseModalEditForm}>&#10006;</span>
                    <div className="modalFormBody">
                        <form id="editedCard">
                            <div className="deck-or-card">
                                <div>
                                    <label htmlFor="chooseDeck">deck</label>
                                    <input
                                        type="radio"
                                        name="deckOrCard"
                                        id="chooseDeck"
                                        value="deck"
                                        checked={this.state.classDeck === "deck"}
                                        disabled={true}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="chooseCard">card</label>
                                    <input
                                        type="radio"
                                        name="deckOrCard"
                                        id="chooseCard"
                                        value="card"
                                        checked={this.state.classDeck === "card"}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            {
                                this.state.classDeck === "deck" ?
                                    <div className="cards-inside cardBodyPart">
                                        <label htmlFor="cards-inside">this deck includes:</label>
                                        <textarea
                                            id="cards-inside"
                                            value={this.cardsInside(this.state.objects)}
                                            disabled="disabled"
                                        />
                                    </div>
                                    : ""
                            }
                            <div className="cardBody">
                                <div className="cardBodyPart">
                                    <label htmlFor="cardName">name</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        id="cardName"
                                        value={this.state.cardName}
                                        onChange={event => {
                                            this.setState({cardName: event.target.value});
                                        }}
                                    />
                                </div>
                                {this.state.classDeck === "card" ?
                                    <div className="cardBodyPart">
                                        <label htmlFor="putToDeck">which deck to put this card</label>
                                        <select
                                            name="cardDeck"
                                            id="putToDeck"
                                            value={this.state.cardDeck}
                                            onChange={event => {
                                                this.setState({cardDeck: event.target.value});
                                            }}
                                        >
                                            {this.state.decks.map(item => {
                                                return <option key={item.id} value={item.name}>{item.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                    :
                                    <div className="cardBodyPart">
                                        <label htmlFor="createDeck">deck</label>
                                        <input
                                            type="text"
                                            name="deckName"
                                            id="createDeck"
                                            value={this.state.cardName}
                                            onChange={event => {
                                                this.setState({deckName: event.target.value});
                                            }}
                                            disabled={true}
                                        />
                                    </div>
                                }
                                {this.state.classDeck === "deck" ?
                                    <div className="cardBodyPart">
                                        <label htmlFor="cardType">type of item</label>
                                        <input
                                            type="text"
                                            name="cardType"
                                            id="cardType"
                                            value={this.state.cardName}
                                            onChange={event => {
                                                this.setState({cardType: event.target.value});
                                            }}
                                            disabled={true}
                                        />
                                    </div>
                                    :
                                    <div className="cardBodyPart">
                                        <label htmlFor="cardType">type of item</label>
                                        <input
                                            type="text"
                                            name="cardType"
                                            id="cardType"
                                            value={this.state.cardType}
                                            onChange={event => {
                                                this.setState({cardType: event.target.value});
                                            }}
                                        />
                                    </div>
                                }
                                <div className="cardBodyPart">
                                    <label htmlFor="cardDescription">item description</label>
                                    <textarea
                                        name="cardDescription"
                                        id="cardDescription"
                                        value={this.state.cardDescription}
                                        placeholder={this.state.cardDescription || "add description here..."}
                                        onChange={event => {
                                            this.setState({cardDescription: event.target.value});
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="warningMess">
                                <span>{this.state.warningMess}</span>
                            </div>
                            <div className="newCardButtons">
                                <button
                                    className="addCardButton allTheButtons"
                                    onClick={this.saveIt}
                                >
                                    Save it!
                                </button>
                                <button
                                    className="cancelAddCardButton allTheButtons"
                                    onClick={event => {
                                        event.preventDefault();
                                        this.toCloseModalEditForm();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default editExistingCard;