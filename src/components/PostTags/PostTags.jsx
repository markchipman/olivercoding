import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";
import "./PostTags.scss";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        <hr />
        <h4 className="tags-label">Tags:</h4>
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/tags/${_.kebabCase(tag)}`}
              className="tags-button"
            >
              <button>{tag}</button>
            </Link>
          ))}
      </div>
    );
  }
}

export default PostTags;
