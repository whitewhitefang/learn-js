import React, {Component} from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card,
            showedDesc: false
        };
    }
    showDesc = () => {
        if (!this.state.showedDesc) {
            this.setState({showedDesc: true});
        } else {
            this.setState({showedDesc: false});
        }
    };
    render() {
        return (
            <div className="card" onClick={this.showDesc}>
                <h2>{this.state.card.name}</h2>
                <div className="desc">
                    {this.state.showedDesc ? this.state.card.description : ""}
                </div>
            </div>
        )
    }
}

export default Card;