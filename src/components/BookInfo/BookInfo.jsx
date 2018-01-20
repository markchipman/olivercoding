import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";

var sortByDate = function(a, b) {
    var keyA = new Date(a.dateAdded),
        keyB = new Date(b.dateAdded);
    // Compare the 2 dates
    if(keyA < keyB) return -1
    if(keyA > keyB) return 1
    return 0
}

class BookInfo extends Component {
  render() {
    return (
        <div className="container">
        {this.props.reviews.sort(sortByDate).map(review => (            
            <div className="box" key={review.reviewID}>
                <article className="columns" >
                    <figure className="column is-narrow">
                        <img src={review.book.imageUrl} />
                    </figure>
                    <div className="column">
                        <div className="content">
                            <h1 className="title is-3 is-link"><a href={review.book.link}>{review.book.title}</a></h1>
                            <div dangerouslySetInnerHTML={{ __html: review.book.description}} />
                        </div>
                    </div>
                </article>
            </div>
            ))}
        </div>
    );
  }
}

export default BookInfo;
