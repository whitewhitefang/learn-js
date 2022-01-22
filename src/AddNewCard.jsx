import React, {Component} from 'react';

class AddNewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: this.props.decks,
            cards: this.props.cards,
            deckOrCard: "card",
            newCardName: "",
            newDeckName: "",
            newCardDeck: "",
            newCardType: "",
            newCardDescription: "",
            warningMess: "",
            controls: ["newCardName", "newDeckName", "newCardDeck", "newCardType", "newCardDescription"],
            errors: {
                newCardName: [],
                newDeckName: [],
                newCardDeck: [],
                newCardType: [],
                newCardDescription: []
            }
        };
    }
    validate = controls => {
        let errors = {};
        this.state.controls.forEach(control => {
            errors[control] = [];
            switch (control) {
                case "newCardName":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should give a name to this card.\n");
                    }
                    break;
                case "newDeckName":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should give new deck a name.\n");
                    }
                    break;
                case "newCardDeck":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should select a deck.\n");
                    }
                    break;
                case "newCardType":
                    if (!this.state[control] && controls.includes(control)) {
                        this.state.errors[control].push("You should write a type for this item.\n");
                    }
                    break;
                case "newCardDescription":
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
    toCloseModalForm = () => {
        this.props.closeModalForm();
    };
    escapeClose = event => {
        if (event.key === "Escape") {
            this.toCloseModalForm();
        }
    };
    saveNewDeck = async(deck) => {
        await fetch("http://localhost:5000/js", {
            method: "POST",
            body: JSON.stringify(deck),
            headers: {
                "Content-type": "application/json"
            }
        });
        this.toCloseModalForm();
        this.props.getAndUnpack();
    };
    saveNewCard = async(card) => {
        let deckArrFiltered = this.state.decks.filter(item => item.name === this.state.newCardDeck);
        let deck = deckArrFiltered[0];
        if (deck.objects.length === 0) {
            card.id = Number.parseInt(deck.id, 10) + 0.1;
        } else {
            card.id = Number((Number.parseFloat(deck.objects[deck.objects.length - 1].id) + 0.01).toPrecision(4));
        }
        deck.objects.push(card);
        await fetch(`http://localhost:5000/js/${deck.id}`, {
            method: "PUT",
            body: JSON.stringify(deck),
            headers: {
                "Content-type": "application/json"
            }
        });
        this.props.getAndUnpack();
        this.toCloseModalForm();
    };
    saveIt = event => {
        event.preventDefault();
        if (this.state.deckOrCard === "deck") {
            this.validate(["newCardName"]);
            if (this.isValid()) {
                const newDeck = {
                    name: this.state.newCardName,
                    classDeck: this.state.deckOrCard,
                    deck: this.state.newCardName,
                    type: this.state.newCardName,
                    description: this.state.newCardDescription,
                    objects: []
                };
                this.saveNewDeck(newDeck);
            }
        } else if (this.state.deckOrCard === "card") {
            this.validate(["newCardName", "newCardDeck", "newCardType", "newCardDescription"]);
            if (this.isValid()) {
                const newCard = {
                    name: this.state.newCardName,
                    classDeck: this.state.deckOrCard,
                    deck: this.state.newCardDeck,
                    type: this.state.newCardType,
                    description: this.state.newCardDescription
                };
                this.saveNewCard(newCard);
            }
        }
    };
    render() {
        return (
            <div className="modal-layer" onKeyDown={this.toCloseModalForm}>
                <div className="modalForm">
                    <span className="closeSign" onClick={this.toCloseModalForm}>&#10006;</span>
                    <div className="modalFormBody">
                        <form id="newCard">
                            <div className="deck-or-card">
                                <div>
                                    <label htmlFor="chooseDeck">create a Deck</label>
                                    <input
                                        type="radio"
                                        name="deckOrCard"
                                        id="chooseDeck"
                                        value="deck"
                                        onChange={event => {
                                            this.setState({deckOrCard: event.target.value});
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="chooseCard">create a Card</label>
                                    <input
                                        type="radio"
                                        name="deckOrCard"
                                        id="chooseCard"
                                        value="card"
                                        checked={this.state.deckOrCard === "card"}
                                        onChange={event => {
                                            this.setState({deckOrCard: event.target.value});
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="newCardBody">
                                <div className="newCardBodyPart">
                                    <label htmlFor="newCardName">name</label>
                                    <input
                                        type="text"
                                        name="newCardName"
                                        id="newCardName"
                                        autoFocus="autoFocus"
                                        value={this.state.newCardName}
                                        onChange={event => {
                                            this.setState({newCardName: event.target.value});
                                        }}
                                    />
                                </div>
                                {this.state.deckOrCard === "card" ? <div className="newCardBodyPart">
                                    <label htmlFor="putToDeck">which deck to put this card</label>
                                    <select
                                        name="newCardDeck"
                                        id="putToDeck"
                                        value={this.state.newCardDeck}
                                        onChange={event => {
                                            this.setState({newCardDeck: event.target.value});
                                        }}
                                    >
                                        {this.state.decks.map(item => {
                                            return <option key={item.id} value={item.name}>{item.name}</option>;
                                        })}
                                    </select>
                                </div>
                                    :
                                    <div className="newCardBodyPart">
                                        <label htmlFor="createDeck">deck</label>
                                        <input
                                            type="text"
                                            name="newDeckName"
                                            id="createDeck"
                                            defaultValue={this.state.newCardName}
                                            disabled="disabled"
                                        />
                                    </div>
                                }
                                {this.state.deckOrCard === "deck" ?
                                    <div className="newCardBodyPart">
                                        <label htmlFor="newCardType">choose a type of item</label>
                                        <input
                                            type="text"
                                            name="newCardType"
                                            id="newCardType"
                                            defaultValue={this.state.newCardName}
                                            disabled="disabled"
                                        />
                                    </div>
                                    :
                                    <div className="newCardBodyPart">
                                        <label htmlFor="newCardType">choose a type of item</label>
                                        <input
                                            type="text"
                                            name="newCardType"
                                            id="newCardType"
                                            value={this.state.newCardType}
                                            onChange={event => {
                                                this.setState({newCardType: event.target.value});
                                            }}
                                        />
                                    </div>
                                }
                                <div className="newCardBodyPart">
                                    <label htmlFor="newCardDescription">item description</label>
                                    <textarea
                                        name="newCardDescription"
                                        id="newCardDescription"
                                        value={this.state.newCardDescription}
                                        onChange={event => {
                                            this.setState({newCardDescription: event.target.value});
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
                                    this.toCloseModalForm();
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

export default AddNewCard;