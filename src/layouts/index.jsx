import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Link from "gatsby-link";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import Header from "../components/Header/Header";
import { OliverLogo } from "./static"

import "./index.scss";

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
        <NavBar />
        {/* The below Navbar is a dummy element used to get spacing right on the top. */}
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-item">
              <img className="image is-48x48" src={OliverLogo}/>
            </div>
          </div>
        </nav>
        <Header />
        <div className="container">
          {children()}
        </div>
        <Footer config={config} />
      </div>
    );
  }
}
