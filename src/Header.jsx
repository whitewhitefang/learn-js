import React, {Component} from 'react';
import binFull from './imgs/binFull.png';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <ul>
                    <li>
                        <div className="menuItem">
                            <a href="/#" onClick={this.props.toggleModalForm}>+ add new</a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem">
                            <a href="/#" onClick={this.props.toggleEditMode}>{this.props.editMode ? "cancel editing" : "edit mode"}</a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem">
                            <a href="/#">learn all</a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem" onClick={this.props.toggleTheRandom}>
                            <a href="/#">random card</a>
                        </div>
                    </li>
                    <li>
                        <div className="menuItem recycle">
                            <a href="/#" onClick={this.props.toggleModalForm}>
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