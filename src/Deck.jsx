import React, {Component} from 'react';

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
                    <h2>{this.state.item.name}</h2>
                    <h4>{this.state.item.type || ""}</h4>
                    <h4>{this.state.item.objects ? (this.state.item.objects.length + ` object()s inside`) : ""}</h4>
                </div>
            </div>
        );
    }
}

export default Deck;