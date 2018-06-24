import React from "react";
import _ from "lodash";

import "../../layouts/index.scss";

class TagListing extends React.Component {
  getTagList() {
    const tagList = [];
    this.props.postEdges.forEach(postEdge => {
      _.forEach(postEdge.node.frontmatter.tags, x => tagList.push(x));
    });
    return _.countBy(tagList);
  }

  render() {
    const tagList = this.getTagList();    
    return (
        <div className="content">
            <h3 className="subtitle is-4">Tags</h3>
            <div className="field is-grouped is-grouped-multiline">
            { _.keys(tagList).sort(function(a, b) { return tagList[b] - tagList[a]; }).map(x =>
                <div className="control" key={x}>
                    <a href={"/tags/" + _.kebabCase(x)}>
                        <div className="tags2 has-addons">
                            <span className="tag2 is-dark">{x}</span>
                            <span className="tag2 is-info">{tagList[x]}</span>
                        </div>
                    </a>
                </div>
            )}
            </div>
        </div>
    );
  }
}

export default TagListing;
