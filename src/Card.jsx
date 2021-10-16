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
                {this.props.editMode ?
                    <div className="editButtonsSection">
                        <button
                            className="editButton allTheButtons"
                            onClick={event => {
                                event.stopPropagation();
                                this.props.editedCard(this.state.card);
                            }}
                        >
                            edit
                        </button>
                        <button
                            className="deleteButton allTheButtons"
                            onClick={event => {
                                event.stopPropagation();
                                this.props.deleteIt(this.state.card)}}
                        >
                            delete
                        </button>
                    </div>
                    : ""}
                <div className="desc">
                    {this.state.showedDesc ? this.state.card.description : ""}
                </div>
            </div>
        )
    }
}

export default Card;