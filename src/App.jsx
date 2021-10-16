import React, {Component} from 'react';
import MainContent from "./MainContent";
import "./App.css";
import Header from "./Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            random: false,
            modalForm: false,
            editMode: false,
            modalEditCard: false
        }
    }
    modalToEditCard = () => {
        if (!this.state.modalEditCard) {
            this.setState({modalEditCard: true});
        } else {
            this.setState({modalEditCard: false});
        }
    };
    toggleTheRandom = () => {
        const ran = this.state.random;
        this.setState({random: !ran});
    };
    toggleModalForm = () => {
        const modal = this.state.modalForm;
        this.setState({modalForm: !modal});
    };
    toggleEditMode = () => {
        const edit = this.state.editMode;
        this.setState({editMode: !edit});
    };
    closeModal = () => {
        this.setState({random: false});
    };
    closeModalForm = () => {
        this.setState({modalForm: false});
    };
    render() {
        return (
            <div className="container">
                <Header
                    toggleTheRandom={this.toggleTheRandom}
                    toggleModalForm={this.toggleModalForm}
                    toggleEditMode={this.toggleEditMode}
                    editMode={this.state.editMode}
                />
                <MainContent
                    random={this.state.random}
                    closeModal={this.closeModal}
                    modalForm={this.state.modalForm}
                    closeModalForm={this.closeModalForm}
                    editMode={this.state.editMode}
                    modalEditCard={this.state.modalEditCard}
                    modalToEditCard={this.modalToEditCard}
                />
            </div>
        );
    }
}

export default App;


