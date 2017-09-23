import React from "react";
import Link from "gatsby-link";

import "../../layouts/index.scss";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.frontmatter.path,
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.frontmatter.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <div className="blog-post-preview" key={post.id}>
            <h1 className="blog-post-title">
              <Link to={post.path}>{post.title}</Link>
            </h1>
            <h3 className="blog-post-date">{post.date}</h3>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
