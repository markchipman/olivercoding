import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Link from "gatsby-link";
import Footer from "../components/Footer/Footer";

import logo from "../static/logo.svg";
import "./index.scss";

const Header = () => (
  <div className="layout-header-bar">
    <div className="layout-header-bar-internal">
      <h1>
        <Link
          to="/"
          style={{
            color: "rgb(201, 182, 76)",
            textDecoration: "none",
            textShadow: "1px 1px #111122",
            margin: 0
          }}
        >
          <img
            width="100px"
            height="100px"
            src={logo}
            style={{
              margin: "0px 15px 0px 0px",
              padding: "0px 0px 0px 0px",
              float: "left"
            }}
          />
          OLIVER CODING
        </Link>
      </h1>
    </div>
  </div>
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
        <div className="layout-body">
          {children()}
          <Footer config={config} />
        </div>
      </div>
    );
  }
}
