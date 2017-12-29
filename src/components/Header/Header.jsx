import React, {Component} from "react";
import Link from "gatsby-link";

class Header extends Component {
    render() {
        return(
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-mobile is-centered is-is-multiline">
                    <div className="column is-narrow">
                    <Link
                        to="/"
                        style={{
                            color: "rgb(201, 182, 76)",
                            textDecoration: "none",
                            textShadow: "1px 1px #111122",
                            margin: 0
                        }}
                        >
                        <img className="image is-128x128"
                        src={this.props.logo}/>
                    </Link>
                    </div>
                <div className="column">
                    <Link
                        to="/"
                        style={{
                            color: "rgb(201, 182, 76)",
                            textDecoration: "none",
                            textShadow: "1px 1px #111122",
                            margin: 0
                        }}
                        >
                        <h1 className="title">OLIVER<br/>CODING</h1>
                    </Link>
                </div>
                </div>
            </div>
          </div>
        </section>
        );
    }
}

export default Header;
