import React, { Component } from "react";
import { OliverProfilePicture } from "../../layouts/static"

class About extends Component {
  render() {
    return (
      <div>
        <article className="columns is-multi-line">
          <div className="media-content column">
            <div className="content is-medium">
              <p>
                I am Daniel Oliver, a Tennessee Software Developer. I am constantly learning and building new things and I blog about them here.
                <br/>
                <br/>
                My hobbies include flying drones, fencing with swords, playing boardgames, and reading books.
              </p>
            </div>
          </div>
          <div className="column">
            <img className="image" src={OliverProfilePicture} width={480} alt="profile picture" />
          </div>
        </article>
      </div>
    );
  }
}

export default About;
