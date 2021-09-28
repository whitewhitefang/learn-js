import React, {Component} from 'react';
import Deck from './Deck';
import Card from "./Card";
import ModalCard from "./ModalCard";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: [],
            cards: [],
            deck: [],
            openedDeck: false
        };
    }
    componentDidMount(props) {
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
            const deckArr = this.state.cards.filter(item => item.deck === currDeck.type);
            this.setState({deck: deckArr, openedDeck: true});
        } else {
            this.setState({deck: [], openedDeck: false});
        }
    };
    getRandomCard = () => {
        const currRandom = Math.trunc(1 + Math.random() * this.state.cards.length);
        return this.state.cards[currRandom];
    };
    render() {
        return (
            <div>
                {this.props.random ? <ModalCard
                    card={this.getRandomCard()}
                    nextModalCard={this.getRandomCard}
                    closeModal={this.props.closeModal}
                /> : ""}
                <div className="decks">
                    {this.state.decks.map(item => {
                        return (
                            <Deck
                                item={item}
                                key={item.id}
                                onShowCards={this.showCards}
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
                            />
                        )
                    }) : ""}
                </div>
            </div>
        )
    }
}

export default MainContent;