import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import TagListing from "../components/TagListing/TagListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.posts.edges;
    const tagEdges = this.props.data.tags.edges;
    return (
      <div>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
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

export default Index;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
query IndexQuery {
  posts: allMarkdownRemark(
    limit: 2000
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tags
          date(formatString: "MMMM DD, YYYY")
          path
          excerpt
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
