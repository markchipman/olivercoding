import React, { Component } from "react";
import Link from "gatsby-link";

const NavLink = (props) => (
    <Link to={props.link} className="navbar-item" >
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
    }
    toggleBurgerMenu() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    render() {
      const menuClassNames = "navbar-menu " + (this.state.active ? "is-active": "");
      const burgerClassNames = "navbar-burger burger " + (this.state.active ? "is-active": "");

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <div className="navbar-item">
                  <img className="image is-48x48" src={this.props.logo}/>
                </div>
                <div className={burgerClassNames} onClick={this.toggleBurgerMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={menuClassNames}>    
                <div className="navbar-start">
                  <NavLink link="/" title="Home" />
                  <NavLink link="/About" title="About" />
                </div>  
              </div>          
            </nav>
        );
  }
}

export default NavBar;