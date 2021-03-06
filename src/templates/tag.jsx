import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import TagListing from "../components/TagListing/TagListing";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const tag = this.props.pathContext.tag;
    const postEdges = this.props.data.posts.edges;
    const tagEdges = this.props.data.tags.edges;
    const tagMessage = `Posts tagged as ${tag}` || config.siteTitle;
    return (
      <div className="tag-container">
        <Helmet title={tagMessage} />
        <h1 className="title">{tagMessage}</h1>
        <div className="columns">
          <div className="column is-three-quarters">
            <PostListing postEdges={postEdges} />
          </div>
          <div className="column">
            <TagListing postEdges={tagEdges} />
          </div>
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
query TagPage($tag: String) {
  posts: allMarkdownRemark(
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
  tags: allMarkdownRemark {
    edges {
      node {
        frontmatter {
          tags
        }
      }
    }
  }
}
`;
