import React from "react";
import Helmet from "react-helmet";
import UserInfo from "../components/UserInfo/UserInfo";
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import Link from "gatsby-link";

export default class PostTemplate extends React.Component {
  render() {
    const { slug, pathActual } = this.props.pathContext;
    const postNode = this.props.data.currentPage;
    const post = postNode.frontmatter;
    const previousPost = this.props.data.previousPost;
    const nextPost = this.props.data.nextPost;

    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="content">
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={pathActual} postNode={postNode} postSEO />
        <div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={pathActual} postNode={postNode} />
          </div>
          <div className="columns">
            { previousPost &&
              <div className="box column" >
                <h1 className="title is-6">
                  <Link to={`../${previousPost.frontmatter.path}`}><h1 className="is-link">Previous: {previousPost.frontmatter.title}</h1></Link>
                </h1>
              </div>

            }
            { nextPost &&
              <div className="box column" >
                <h1 className="title is-6">
                  <Link to={`../${nextPost.frontmatter.path}`}><h1 className="is-link">Next: {nextPost.frontmatter.title}</h1></Link>
                </h1>
              </div>
            }
          </div>
          <UserInfo config={config} />
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
query BlogPostBySlug($slug: String!, $previousPageSlug: String!, $nextPageSlug: String!) {
  currentPage: markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      excerpt
      title
      date(formatString: "MMMM DD, YYYY")
      category
      tags
    }
    fields {
      slug
    }
  }
  previousPost: markdownRemark(fields: { slug: { eq: $previousPageSlug } }) {
    frontmatter {
      excerpt
      title
      path
      date(formatString: "MMMM DD, YYYY")
    }
    fields {
      slug
    }
  }
  nextPost: markdownRemark(fields: { slug: { eq: $nextPageSlug } }) {
    frontmatter {
      excerpt
      title
      path
      date(formatString: "MMMM DD, YYYY")
    }
    fields {
      slug
    }
  }
}
`;
