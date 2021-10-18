import React, {Component} from 'react';
import Deck from './Deck';
import Card from "./Card";
import ModalCard from "./ModalCard";
import AddNewCard from "./AddNewCard";
import EditExistingCard from "./EditExistingCard";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: [],
            cards: [],
            deck: [],
            openedDeck: false,
            editedCard: {}
        };
    }
    componentDidMount() {
        this.getAndUnpack();
    };
    getAndUnpack = async() => {
        const request = await fetch("http://localhost:5000/js", {
            method: "GET"
        });
        const content = await request.json();
        this.unpacking(content);
    };
    unpacking = cards => {
        let unpackedCards = [];
        let unpackedDecks = [];
        for (let card of cards) {
            unpack(card);
        }
        function unpack(obj) {
            if (Array.isArray(obj)) {
                for (let ob of obj) {
                    unpackedCards.push(ob);
                }
            } else {
                unpackedDecks.push(obj);
                unpack(obj.objects);
            }
        }
        this.setState({decks: unpackedDecks, cards: unpackedCards});
    };
    showCards = currDeck => {
        if (!this.state.openedDeck) {
            const deckArr = this.state.cards.filter(item => item.deck.toLowerCase() === currDeck.type.toLowerCase());
            this.setState({deck: deckArr, openedDeck: true});
        } else {
            this.setState({deck: [], openedDeck: false});
        }
    };
    editedCard = item => {
        this.props.modalToEditCard();
        this.setState({editedCard: item});
    };
    deleteCard = async(item) => {
        let url = `http://localhost:5000/js/`;
        if (item.classDeck === "card") {
            const deck = this.state.decks.filter(exactDeck => exactDeck.name === item.deck)[0];
            url = url + deck.id;
            let index = 0;
            let arr = deck.objects;
            for (const card of arr) {
                if (card.id === item.id) {
                    index = arr.indexOf(card);
                }
            }
            deck.objects.splice(index, 1);
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(deck),
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (response.ok) {
                this.getAndUnpack();
                const refreshedDeck = this.state.decks.filter(exactDeck => exactDeck.id === deck.id)[0].objects;
                this.setState({deck: refreshedDeck});
            } else {
                console.log("Something went wrong");
            }
        } else {
            url = url + item.id;
            const response = await fetch(url, {
                method: "DELETE"
            });
            if (response.ok) {
                this.getAndUnpack();
            } else {
                console.log("Something went wrong");
            }
        }
    };
    deleteIt = item => {
        const yes = window.confirm("Are you sure in this action with deleting this card and any others inside of it?");
        if (yes) {
            this.deleteCard(item);
        }
    };
    findAndScroll = () => {
        let coords = window.document.querySelector(".cards");
        coords.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
    };
    componentDidUpdate() {
        if (this.state.openedDeck) {
            this.findAndScroll();
        }
    }
    render() {
        return (
            <div className="mainContentDiv">
                {this.props.random ? <ModalCard
                    cards={this.state.cards}
                    closeModal={this.props.closeModal}
                /> : ""}
                {this.props.modalForm ? <AddNewCard
                    closeModalForm={this.props.closeModalForm}
                    getAndUnpack={this.getAndUnpack}
                    decks={this.state.decks}
                    cards={this.state.cards}
                /> : ""}
                {this.props.modalEditCard ? <EditExistingCard
                    getAndUnpack={this.getAndUnpack}
                    decks={this.state.decks}
                    cards={this.state.cards}
                    editedCard={this.state.editedCard}
                    modalToEditCard={this.props.modalToEditCard}
                    deleteCard={this.deleteCard}
                /> : ""}
                <div className="decks">
                    {this.state.decks.map(item => {
                        return (
                            <Deck
                                item={item}
                                key={item.id}
                                onShowCards={this.showCards}
                                editMode={this.props.editMode}
                                editedCard={this.editedCard}
                                modalToEditCard={this.props.modalToEditCard}
                                deleteIt={this.deleteIt}
                                openedDeck={this.state.openedDeck}
                            />
                            )
                    })}
                </div>
                <div className="cards">
                    {this.state.deck ? this.state.deck.map(item => {
                        return (
                            <Card
                                card={item}
                                key={item.id}
                                editMode={this.props.editMode}
                                editedCard={this.editedCard}
                                modalToEditCard={this.props.modalToEditCard}
                                deleteIt={this.deleteIt}
                            />
                        )
                    }) : ""}
                </div>
            </div>
        )
    }
}

export default MainContent;