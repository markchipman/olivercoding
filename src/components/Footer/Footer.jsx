import React, { Component } from "react";
import Link from "gatsby-link";
import UserLinks from "../UserLinks/UserLinks";

class Footer extends Component {
  render() {
    const { config } = this.props;
    const url = config.siteRss;
    const copyright = config.copyright;
    if (!copyright) {
      return null;
    }
    return (
      <footer className="footer">      
        <div className="container">
          <div className="content is-medium has-text-centered">
            <UserLinks config={config} labeled />
            <div className="notice-container">
              <h4>{copyright}</h4>

              <a href={url} target="_blank">
                <button className="button is-info">Subscribe</button>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
