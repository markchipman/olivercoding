import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const tag = this.props.pathContext.tag;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const tagMessage = `Posts tagged as ${tag}` || config.siteTitle;
    return (
      <div className="tag-container">
        <Helmet title={tagMessage} />
        <h1>{tagMessage}</h1>
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          html
          frontmatter {
            excerpt
            title
            date
            category
            path
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
