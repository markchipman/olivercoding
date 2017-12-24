import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Link from "gatsby-link";
import Footer from "../components/Footer/Footer";

import logo from "../static/logo.svg";
import "./index.scss";

const Header = () => (
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
                  src={logo}/>
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

export default class MainLayout extends React.Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "tags/") {
      title = "Tags";
    } else if (currentPath === "categories/") {
      title = "Categories";
    } else if (currentPath === "about/") {
      title = "About";
    } else if (currentPath.includes("posts")) {
      title = "Article";
    } else if (currentPath.includes("tags/")) {
      const tag = currentPath
        .replace("tags/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (currentPath.includes("categories/")) {
      const category = currentPath
        .replace("categories/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Header />
        <div className="container">
          {children()}
        </div>
        <Footer config={config} />
      </div>
    );
  }
}
