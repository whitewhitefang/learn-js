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
                <div className="deck" onClick={() => {
                    this.props.onShowCards(this.state.item)
                }}>
                    <p className="amount">{this.state.item?.objects.length}</p>
                    <h2>{this.state.item.name}</h2>
                    <ButtonDesc
                        item={this.state.item}
                    />
                </div>
            </div>
        );
    }
}

export default Deck;