import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pathContext.category;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const categoryMessage = `Posts categorized as ${category}` || config.siteTitle;
    return (
      <div className="category-container">
        <Helmet title={categoryMessage} />
        <h1 className="title">{categoryMessage}</h1>
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          html
          frontmatter {
            excerpt
            title
            date(formatString: "MMMM DD, YYYY")
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
