import React, {Component} from 'react';
import Deck from './Deck';
import Card from "./Card";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: [],
            subDecks: [],
            cards: [],
            deck: [],
            openedDeck: false,
            openedSubDeck: false
        }
    }
    componentDidMount = async() => {
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
        if (currDeck.classDeck === "super-deck") {
            if (!this.state.openedSubDeck) {
                const subDeckArr = currDeck.objects;
                this.setState({subDecks: subDeckArr, openedSubDeck: true});
            } else {
                this.setState({subDecks: [], openedSubDeck: false});
            }
        } else {
            if (!this.state.openedDeck && !this.state.openedSubDeck) {
                const deckArr = this.state.cards.filter(item => item.deck === currDeck.type);
                this.setState({deck: deckArr, openedDeck: true});
            } else {
                this.setState({deck: [], openedDeck: false});
            }
        }
    };
    render() {
        return (
            <div>
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
                <div className="subDecks">
                    {this.state.subDecks ? this.state.subDecks.map(item => {
                        return (
                            <Deck
                                item={item}
                                key={item.id}
                                onShowCards={this.showCards}
                            />
                        )
                    }) : ""}
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