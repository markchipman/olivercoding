---
path: "2018-07-01"
date: "2018-07-01T13:00:00-04:00"
title: "Connecting Visual Studio Team Services to Azure Active Directory"
excerpt: "Connecting Visual Studio Team Services to Azure Active Directory makes security of users easy and a unified experience across the organization."
category: "tech"
tags:
   - VSTS
   - Azure
   - Active Directory
---

Azure Active Directory makes it easy to add a custom domain.  So I have several here.  It's as simple as adding a single record to DNS.

![Custom Domains](ad_custom_domains.png)

With these custom domains, I have several users under one of these domains.

![Custom Domains](ad_domain_users.png)

## VSTS setup

I have a VSTS project that I want to hook up to this custom domain's logins.

![VSTS Project](VSTS_Project.png)

Note that I'm logged into VSTS and Azure with the same account which has owner permissions on both.

Looking under "All Resources" I can find Team Services.

![Team Services Search](team_service_azure_search.png)

I'm setting up KnoxTechTrend, so I'll pick that from the top of the list.

![Azure Team Services](team_service_list.png)

At the very top, select "Connect" and Team Services will hook up to Azure

![Azure VSTS](connected_vsts.png)

Go back to VSTS and add the members.

![VSTS Members](vsts_members.png)

The users on the custom domain in your Azure Active Directory can now log into VSTS.

## Summary

Azure Active Directory makes a lot of things simple and easy to use.  For a more comprehensive set of steps that takes more possibilities into account, see the [Azure documentation][0].

[0]: https://docs.microsoft.com/en-us/vsts/organizations/accounts/connect-account-to-aad?view=vsts

