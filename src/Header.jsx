import React, {Component} from 'react';
import Moon from './imgs/moon.png';
import Sun from './imgs/sun.png';
import Home from './imgs/home.png';

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
    scrollTo = event => {
        event.preventDefault();
        const mainContentDiv = document.querySelector('.mainContentDiv');
        mainContentDiv.scrollIntoView({behavior: "smooth"});
    };
    render() {
        return (
            <div className="header">
                <ul>
                    <li>
                        <div className="menuItem">
                            <a
                                href={"/#"}
                                onClick={this.scrollTo}
                            >
                                <img
                                    className="home"
                                    src={Home}
                                    alt="to start"
                                />
                                to start
                            </a>
                        </div>
                    </li>
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
                        <div
                            className="menuItem"
                        >
                            <a href="/#"
                                onClick={this.props.toggleTheme}
                            >
                                {this.props.theme === "light" ?
                                    <img src={Moon} alt="dark mode"/>
                                    :
                                    <img src={Sun} alt="light mode"/>
                                }
                            </a>
                        </div>
                    </li>
                    <li>
                        <div
                            className="menuItem"
                            onClick={this.props.toAbout}
                        >
                            <a href="/#">about</a>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;