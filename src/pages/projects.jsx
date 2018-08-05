import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";

class Projects extends React.Component {
    render() {
        return (
            <div className="index-container">
                <Helmet title={config.siteTitle} />
                <h1 className="title">Projects</h1>
                <h1 className="subtitle">I have a lot of projects going on, here are some of my favorites.</h1>
                <div className="container content">
                    <div className="box" key="1">
                        <h1 className="title">FLexer</h1>
                        <h3 className="subtitle">Simple Lexer and Parser in F#</h3>
                        <div className="field is-grouped is-grouped-multiline">
                            <div className="control" key="1">
                                <div className="tags2 has-addons">
                                    <span className="tag2 is-dark">Status</span>
                                    <span className="tag2 is-info">Complete</span>
                                </div>
                            </div>
                            <div className="control" key="2">
                                <a href="https://ci.appveyor.com/project/DanielOliver/flexer/branch/master">
                                    <img src="https://ci.appveyor.com/api/projects/status/um5y5hd2a1pd6xtk/branch/master?svg=true" />
                                </a>
                            </div>
                            <div className="control" key="3">
                                <a href="https://www.nuget.org/packages/FLexer">
                                    <img src="https://img.shields.io/nuget/v/FLexer.svg" />
                                </a>
                            </div>
                            <div className="control" key="4">
                                <a href="https://github.com/DanielOliver/flexer/releases/latest">
                                    <img src="https://img.shields.io/github/release/DanielOliver/flexer.svg" />
                                </a>
                            </div>
                            <div className="control" key="5">
                                <a href="https://www.nuget.org/packages/FLexer">
                                    <img src="https://img.shields.io/nuget/dt/FLexer.svg" />
                                </a>
                            </div>

                        </div>
                        <hr />
                        <p> FLexer is a library combining together a Lexer and Parser, to allow ease of construction in custom recursive-descent parsers with infinite backtrack. When searching for a result to "accept", FLexer functions as a depth first search in completely traversing any path, before backtracking and trying a different route.
                            <br /> <br /> FLexer is NOT a parser generator. Rather, it's up the user to write the code for the parser. This puts the responsibility of writing a performance optimal parser on the developer. The happy path of parsing will be "right first try" and very fast; however, the potential to backtrack to the worst case still exists.
                            <br /> <br /> Reasons to use FLexer
                            <ul> <li> Each component of the recursive descent parser may be tested in isolation, after all, it's just functions. </li>
                                <li> It's simple to get started. There's no parser generator or external tools to integrate into the build pipeline, it's just F#. </li>
                                <li> Cross-platform with the core written in .NET Standard 2.0 and no dependencies. </li>
                                <li> Complete customization of the parser is available at any step, such as inserting validation code inline with the parser or even using parsed data to change the parser's functionality. </li>
                            </ul>
                            Reasons to NOT use FLexer
                            <ul> <li> Parser generators can suffice for most requirements. </li> </ul>
                        </p>
                        <hr />
                        <h1 className="title is-link"><a href="https://github.com/DanielOliver/FLexer">Github</a></h1>
                        <h1 className="title is-link"><a href="https://flexer.olivercoding.com/#examplejson">Online Demo</a></h1>
                        <h1 className="title is-link"><a href="https://www.nuget.org/packages/FLexer/">NuGet</a></h1>
                    </div>


                    <div className="box" key="2">
                        <h1 className="title">gatsby-source-azure-storage</h1>
                        <h3 className="subtitle">Source plugin for pulling data into Gatsby from Azure Storage.</h3>
                        <div className="field is-grouped is-grouped-multiline">
                            <div className="control" key="1">
                                <div className="tags2 has-addons">
                                    <span className="tag2 is-dark">Status</span>
                                    <span className="tag2 is-info">Complete</span>
                                </div>
                            </div>
                            <div className="control" key="2">
                                <a href="https://www.npmjs.com/package/gatsby-source-azure-storage">
                                    <img src="https://img.shields.io/npm/v/gatsby-source-azure-storage.svg" />
                                </a>
                            </div>
                            <div className="control" key="3">
                                <a href="https://www.npmjs.com/package/gatsby-source-azure-storage">
                                    <img src="https://img.shields.io/npm/dt/gatsby-source-azure-storage.svg" />
                                </a>
                            </div>
                        </div>
                        <hr />
                        <h1 className="title is-link"><a href="https://github.com/DanielOliver/gatsby-source-azure-storage">Github</a></h1>
                        <h1 className="title is-link"><a href="https://www.npmjs.com/package/gatsby-source-azure-storage">NPM</a></h1>
                    </div>


                    <div className="box" key="3">
                        <h1 className="title">gatsby-source-goodreads</h1>
                        <h3 className="subtitle">Source plugin for pulling your read books into Gatsby from Goodreads API.</h3>
                        <div className="field is-grouped is-grouped-multiline">
                            <div className="control" key="1">
                                <div className="tags2 has-addons">
                                    <span className="tag2 is-dark">Status</span>
                                    <span className="tag2 is-info">Complete</span>
                                </div>
                            </div>
                            <div className="control" key="2">
                                <a href="https://www.npmjs.com/package/gatsby-source-goodreads">
                                    <img src="https://img.shields.io/npm/v/gatsby-source-goodreads.svg" />
                                </a>
                            </div>
                            <div className="control" key="3">
                                <a href="https://www.npmjs.com/package/gatsby-source-goodreads">
                                    <img src="https://img.shields.io/npm/dt/gatsby-source-goodreads.svg" />
                                </a>
                            </div>

                        </div>
                        <hr />
                        <h1 className="title is-link"><a href="https://github.com/DanielOliver/gatsby-source-goodreads">Github</a></h1>
                        <h1 className="title is-link"><a href="https://www.olivercoding.com/RecommendedBooks">Online Demo</a></h1>
                        <h1 className="title is-link"><a href="https://www.npmjs.com/package/gatsby-source-goodreads">NPM</a></h1>
                    </div>


                    
                    <div className="box" key="4">
                        <h1 className="title">Morgemil</h1>
                        <h3 className="subtitle">A level based RogueLike game made in F#</h3>
                        <div className="field is-grouped is-grouped-multiline">
                            <div className="control" key="1">
                                <div className="tags2 has-addons">
                                    <span className="tag2 is-dark">Status</span>
                                    <span className="tag2 is-warning">In-Complete</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h1 className="title is-link"><a href="https://github.com/DanielOliver/Morgemil">Github</a></h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;
