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
        {
        postList.map(post => (
          <div className="box" key={post.path}>
            <h1 className="title is-3">
              <Link to={`../${post.path}`}><h1 className="is-link">{post.title}</h1></Link>
            </h1>
            <p className="subtitle is-4">{post.date}</p>
            <p className="is-size-6">{post.excerpt}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
