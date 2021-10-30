import React, {Component} from 'react';
import Deck from './Deck';
import Card from "./Card";
import ModalCard from "./ModalCard";
import AddNewCard from "./AddNewCard";
import EditExistingCard from "./EditExistingCard";
import ConfirmModal from "./ConfirmModal";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initDecks: [],
            initCards: [],
            decks: [],
            cards: [],
            deck: [],
            openedDeck: false,
            editedCard: {},
            searchedCard: "",
            deletedCard: {}
        };
    }
    componentDidMount() {
        this.getAndUnpack();
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.searchedCard !== this.props.searchedCard) {
            let searchTerm = nextProps.searchedCard;
            let filteredDecks = this.state.initDecks.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            let filteredCards = this.state.initCards.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            this.setState({decks: filteredDecks, cards: filteredCards, searchedCard: this.props.searchedCard, deck: [], openedDeck: false});
        }
        if (nextProps.confirmed !== this.props.confirmed) {
            this.setState({confirmed: nextProps.confirmed});
        }
        return true;
    }
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
        this.setState({
            initDecks: unpackedDecks,
            initCards: unpackedCards,
            decks: unpackedDecks,
            cards: unpackedCards
        });
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
            let deck = this.state.decks.filter(exactDeck => exactDeck.name === item.deck)[0];
            url = url + deck.id;
            let index = 0;
            let arr = JSON.parse(JSON.stringify(deck.objects));
            for (const card of arr) {
                if (card.id === item.id) {
                    index = arr.indexOf(card);
                }
            }
            arr.splice(index, 1);
            deck.objects = arr;
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
        this.props.confirm("Are you sure in this action with deleting this card and any others inside of" +
            " it?");
        this.setState({deletedCard: item});
    };
    reallyDelete = () => {
        this.deleteCard(this.state.deletedCard);
        this.props.closeConfirmModal();
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
                {this.props.modalConfirm ? <ConfirmModal
                    text={this.props.confirmText}
                    closeConfirmModal={this.props.closeConfirmModal}
                    reallyDelete={this.reallyDelete}
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
                                closeConfirmModal={this.props.closeConfirmModal}
                                toConfirm={this.toConfirm}
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
                                closeConfirmModal={this.props.closeConfirmModal}
                                toConfirm={this.toConfirm}
                            />
                        )
                    }) : ""}
                </div>
            </div>
        )
    }
}

export default MainContent;