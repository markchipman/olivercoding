import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/BookInfo/BookInfo";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import BookInfo from "../components/BookInfo/BookInfo";

class RecommendedBooks extends React.Component {
  render() {
    const reviews = this.props.data.goodreadsShelf.reviews;
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <h1 className="title">Recommended Books</h1>
        <h1 className="subtitle">I've read these books. I've enjoyed and learned from them.</h1>
        <div className="container">
          <BookInfo reviews={reviews} />
        </div>
      </div>
    );
  }
}

export default RecommendedBooks;


/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query RecommendedBooksQuery{
    goodreadsShelf {
      id
      shelfName    
      reviews {
        reviewID
        rating
        votes
        spoilerFlag
        dateAdded
        dateUpdated
        book {
          bookID
          isbn
          isbn13
          textReviewsCount
          uri             
          link
          title
          titleWithoutSeries
          imageUrl
          smallImageUrl
          largeImageUrl
          description        
        }
      }
    }
  }
`;
