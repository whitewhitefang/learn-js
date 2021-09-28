import React, {Component} from 'react';
import MainContent from "./MainContent";
import "./App.css";
import Header from "./Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            random: false
        }
    }
    toggleTheRandom = () => {
        const ran = this.state.random;
        this.setState({random: !ran});
    };
    closeModal = () => {
        this.setState({random: false});
    };
    render() {
        return (
            <div className="container">
                <Header
                    toggleTheRandom={this.toggleTheRandom}
                />
                <MainContent
                    random={this.state.random}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

export default App;


