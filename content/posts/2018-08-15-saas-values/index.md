---
path: "2018-08-15-saas-values"
date: "2018-08-15T13:00:00-04:00"
title: "My Values for Software-As-A-Service."
excerpt: "When evaluating technology, tools, or processes, I value these things."
category: "tech"
tags:
   - Work
---

For the past three years, I've mostly worked on Software-As-A-Service (SaaS) web applications. While the set of things I value below isn't unique to SaaS applications, I've mentioned this specifically as context for my recent background.  

I've never had all of these values at one time on any application, but I'd like to imagine that the combination of all of these would be the promised land.

## Values

* **Reproducible Data Storage Schema and Structure with a minimal set of data to initialize a usable state.**
    * Long-lived "legacy" applications that have lived for a long time, tend to say "Production is sovereign, clone sovereign for a usable copy". If this is the reproduction strategy, ok, just make sure the public doesn't have access to any of the other environments.
* **Command-Line-Tooling**
    * Don't make Graphical User Interfaces (GUI) required. If I have to click through an installation wizard, I'm not a fan.
* **A central and unified secret & configuration management system.**
    * Without closely managed secrets, one-off applications tend to disappear into the dark and are only found sometime later when credentials change. At the very least, understand where all credentials are being used, and limiting their access is the only real way to do that.
* **Monitoring and then alerting of any downtime, dangerous exceptions, or unexpected behavior.**
    * Users putting in helpdesk tickets don't count as monitoring and alerting.
* **Infrastructure setup and provisioning should be reproducible.**
    * I want to be able to delete the entire server and reproduce the entire server's contents from a script.
* **Staging environments**
    * Full deployments should be staged and tested in a lower environment than production, but a higher environment than whatever QA is in. There's always the chance for unintended consequences in deployments (whether manual or automated), and deployments are something to test along with the actual code deployed.
* **Automated deployments**
    * Copying files by Remote-Desktop is not automated. Having "push-button deployment" as a gateway check for business owners is fine, but having the entire deployment happen automatically once started is necessary.
* **Unit tests**
    * This is usually not present to start with. SaaS applications tend to start out as a prototype that some visionary made. Adding unit tests in later is completely doable, but then hard to make comprehensive.
* **Integration tests**
    * A comprehensive set of integration tests is the difference between confidence and uncertainty in making changes. Having said that, this may or may not be easily feasible depending on the dependencies.
* **Not rolling your own security.**
    * Getting security right is really hard because you only have to be wrong once to completely invalidate security. Most business applications benefit from using a battle tested set of libraries or 3rd party services already out there.
* **Builds should be scripted and anyone should be able to build from source.**
    * If a software developer can't pull down the code repository and build the software, their code couldn't be trusted to be used.
* **Environments should be scripted and anyone should be able to build from source.**
    * This environment could be a complete server's setup, a set of cloud resources, or a container. The script should be able to both configure and provision the environment with everything it needs.
* **Automated builds on each source control check-in.**
    * At least make sure the project builds without errors each time code is committed to source control. For bonus points, run unit tests on each source control check-in. For mega bonus points, run integration tests.
* **Feature Flags**
    * A feature flag can be an actual feature flag that only the administrator sees, it could be an added "role/profile/permission" to grant, it could be anything that disables or enables functionality. Being able to continuously work on AND deploy the development branch is amazing, and if the development branch accidentally gets a merged feature that isn't ready yet, no problem, disable it with a feature flag and continue shipping.
* **User needs should be self-servicing when possible.**.
    * Help the user when something is needed, it's just good customer service and no software scope is comprehensive enough to know every need beforehand. But once the initial emergency is done, make it so the user (or the administrator) can help themselves and do what they need to. Waiting for anyone, much less technical help, is never fun.
* **Limit feature creep.**
    * Contrary to popular belief, software developers do not determine product deliverables at most companies. I recognize that software developers probably don't have a lot of influence to throw around here, but do push back when there's a good reason not to do something.
* **Dependency licensing might be limiting and expensive.**
    * Commercial software licenses tend to limit the number of environments and how it can be used. And then, depending on product, registration and licensing and auditing process becomes a thorn in everyone's side. Think carefully before buying a license to a service or software, it's just the beginning of the costs and workarounds.
* **Source control is not optional.**
    * Production instance should not be source control.
* **Listen to everyone, but don't make anyone the most important.**
    * Everyone wants things a certain way: Quality Assurance, Security, Database Administrators, System Administrators, Software Service Administrators, Project Managers, Software Engineers, Accounts Receivable, and everyone else. The best process for any one group, is unlikely to be the best compromise for the company as a whole.
* **Simplicity**
    * Automating builds, deployments, tests, monitoring, and secret management is already hard. All it takes is one item that can't be figured out, for everything else above to be ditched in the name of "it's just one thing, we'll handle it by hand" and it's a downhill slope from there.
* **Recognizing Value**
    * Recognizing value isn't a technological requirement, but rather a business and team and process value. Recognizing if the above things add value is important. If the values above are a set of restrictions and challenges to be overcome, then these items will be ditched at the first opportunity.

## Summary

I'm all about cutting down on human error, effort, and time spent. If I still have work to do, I haven't automated enough. If I can explain how to do something, it can be automated. If I can't explain how to do something, I can't repeatably do that thing.
