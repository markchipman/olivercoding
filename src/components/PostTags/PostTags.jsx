import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";
import "./PostTags.scss";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="container">
        <hr />
        <div className="buttons is-centered">
          {tags &&          
            tags.map(tag => (
              <Link
                key={tag}
                style={{ textDecoration: "none" }}
                to={`/tags/${_.kebabCase(tag)}`}
                className="button tag2 is-dark"
              >
                <span>{tag}</span>
              </Link>
            ))}
          </div>
      </div>
    );
  }
}

export default PostTags;
