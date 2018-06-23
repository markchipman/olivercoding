import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import BookInfo from "../components/BookInfo/BookInfo";

class RecommendedBooks extends React.Component {
    render() {
        return (
            <div className="index-container">
                <Helmet title={config.siteTitle} />
                <h1 className="title">Talks</h1>
                <h1 className="subtitle">I'm available to talk at conferences and meetups. These are my past talks.</h1>
                <div className="container">
                    <div className="box" key="1">
                        <h1 className="title is-3">Domain Specific Languages for Fun and Profit</h1>
                        <p> Languages are everywhere I look. C# contains other languages hidden in plain sight as string interpolation, Razor syntax, and LINQ. The JavaScript world has more with a multitude of template languages based on HTML, including Angular, React, and Elm view templates.
                            <br /> <br /> Domain Specific Languages (DSL) are built to concisely and clearly define the solution for a very specific problem, such as a template engine. Template engines have their own Domain Specific Languages leveraging declarative programming which allows us to define the desired result without dictating how to get there.
                            <br /> <br /> In this session, I will walk you through defining the basic syntax of a Domain Specific Language to be used by a simple text template engine, then through parsing that Domain Specific Language into an Abstract Syntax Tree (AST), and then transforming that tree into a result.
                            <br /> <br /> Using this new knowledge, you will be able to create your own Domain Specific Language or to create custom tooling around an existing Domain Specific Language.
                        </p>
                        <hr/>
                        <h1 className="title is-4 is-link"><a href="http://codestock.org/">Codestock 2018</a></h1>
                        <h1 className="title is-4 is-link"><a href="https://www.meetup.com/Nashville-NET-User-Group/events/tzvmhpyxfblb/">Nashville .NET Users Group 2018</a></h1>
                        <h1 className="title is-4 is-link"><a href="https://www.meetup.com/Knox-NET/events/vmxffpyxdbzb/">Knoxville .NET Users Group 2018</a></h1>
                        <h1 className="title is-4 is-link"><a href="https://www.meetup.com/FunctionalKnox/events/245653711/">Knoxville Functional Users Group 2018</a></h1>
                    </div>
                    <div className="box" key="2">
                        <h1 className="title is-3">An Introduction to Server Configuration and Provisioning with Ansible</h1>
                        <p> Some applications and environments just don't fit well into a web app or a Docker container, and not everyone is in the cloud. Most everyone has some on-premise servers and a multitude of virtual machines. Managing all of those servers is difficult and usually involves extensive use of un-documented tribal knowledge to set these servers up or to duplicate these servers for another environment. Ansible automates away these tasks of setting up a server.
                            <br/> <br/> Ansible simplifies server provisioning, preparing the server for use, by allowing tasks to be scripted and source controlled. Server configuration is also kept in source control and encrypted. These Ansible scripts, or "playbooks", not only automate server setup, they now become the documentation of that server.
                            <br/> <br/> In this session, I will give an introduction of Ansible from the ground up and each topic will show its effects on a server.
                            <br/> <br/> No prior knowledge about Ansible is assumed. You will walk away with an understanding of how to do basic tasks with Ansible and when to use Ansible.
                        </p>
                        <hr/>
                        <h1 className="title is-4 is-link"><a href="https://www.meetup.com/DevOps-Knoxville/events/250118186/">Knoxville DevOps Users Group 2018</a></h1>
                        <h1 className="title is-4 is-link"><a href="http://codestock.org/">Codestock 2018</a></h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendedBooks;
