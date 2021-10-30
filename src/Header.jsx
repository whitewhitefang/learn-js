import React, {Component} from 'react';
import binFull from './imgs/binFull.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedCard: ""
        }
    }
    searching = event => {
        this.setState({searchedCard: event.target.value});
        this.props.searching(event.target.value);
    };
    render() {
        return (
            <div className="header">
                <ul>
                    <li>
                        <div className="menuItem" title="add new card">
                            <a href="/#" onClick={event => {
                                event.preventDefault();
                                this.props.toggleModalForm();
                            }}
                            >
                                add
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem" title="edit deck or card">
                            <a href="/#" onClick={event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.props.toggleEditMode();
                            }}
                            >
                                {this.props.editMode ? "edit off" : "edit"}
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem">
                            <a href="/#">learn all</a>
                        </div>
                    </li>
                    <li>
                        <div
                            className="menuItem"
                            title="show random card"
                            onClick={event => {
                                event.preventDefault();
                                this.props.toggleTheRandom();
                            }}
                        >
                            <a href="/#">random</a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem search" title="">
                            <form>
                                <input
                                    type="text"
                                    className="searchBar"
                                    placeholder="search"
                                    value={this.state.searchedCard}
                                    onChange={this.searching}
                                />
                            </form>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem recycle" title="empty trash or restore deleted cards">
                            <a href="/#" onClick={event => {
                                event.preventDefault();
                                this.props.toggleModalForm();
                            }}
                            >
                                <img className="recycleBin" src={binFull} alt="" />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem">
                            <a href="/#">about</a>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;