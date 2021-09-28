import React, {Component} from 'react';

class ButtonDesc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            openedDesc: false,
            desc: "",
            buttonInfo: "see description"
        }
    }
    showDesc = () => {
        if (!this.state.openedDesc) {
            this.setState({desc: this.state.item.description, openedDesc: true, buttonInfo: "close description"});
        } else {
            this.setState({desc: "", openedDesc: false, buttonInfo: "see description"});
        }
    };
    render() {
        if (this.state.item.description) {
            return (
                <div>
                    <h4>{this.state.item.type || ""}</h4>
                    <button className="buttonDesc" onClick={event => {
                        event.stopPropagation();
                        this.showDesc();
                    }}
                    >{this.state.buttonInfo}</button>
                    <div className="textDesc">{this.state.desc}</div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default ButtonDesc;