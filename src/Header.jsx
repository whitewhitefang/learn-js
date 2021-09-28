import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <ul>
                    <li>
                        <div className="menuItem">
                            <a href="/#">+ add new</a>
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
                </ul>
            </div>
        );
    }
}

export default Header;