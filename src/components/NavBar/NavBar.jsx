import React, { Component } from "react";
import Link from "gatsby-link";
import { OliverLogo } from "../../layouts/static"

const NavLink = (props) => (
    <Link to={props.link} onClick={props.toggleOff} className="navbar-item" >
        {props.title}
    </Link>
  );

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
        
        this.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
        this.toggleOff = this.toggleOff.bind(this);
    }
    toggleBurgerMenu() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
    toggleOff() {
        this.setState({ active: false });
    };

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <div className="navbar-item">
                  <img className="image is-48x48" src={OliverLogo}/>
                </div>
                <div className={"navbar-burger burger " + (this.state.active ? "is-active": "")} onClick={this.toggleBurgerMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={"navbar-menu " + (this.state.active ? "is-active": "")}>    
                <div className="navbar-start">
                  <NavLink toggleOff={this.toggleOff} link="/" title="Home"/>
                  <NavLink toggleOff={this.toggleOff} link="/About" title="About" />
                  <NavLink toggleOff={this.toggleOff} link="/RecommendedBooks" title="Books Recommendations" />
                </div>  
              </div>          
            </nav>
        );
  }
}

export default NavBar;