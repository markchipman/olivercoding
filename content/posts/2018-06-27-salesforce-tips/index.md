---
path: "2018-06-27-salesforce-tips"
date: "2018-06-27T13:00:00-04:00"
title: "13 Salesforce Integration tips, tricks, and obscure info"
excerpt: "I've been near Salesforce a lot lately. Here's a bit of knowledge I've picked up on integrating with Salesforce."
category: "tech"
tags:
   - Salesforce
   - SOAP
   - REST
   - Integration
---

1. [Salesforce advises to "Create a special user in your organization, solely for integration purposes."][0]


2. [While talking about integration user, make sure their permissions don't require outbound messaging.][1]
    > To avoid an infinite loop of outbound messages that trigger changes that trigger more outbound messages, the user who updates the objects should not have the “Send Outbound Messages” permission.


3. Upserting rows into Salesforce is not always a good idea because many tables have create-only fields. Such as the [PricebookEntryId on the OpportunityLineItem][2]. Upserting the same row twice, will fail on the second upsert because that column can't be updated.


4. By default, Salesforce allows free-text in State or Country fields. This is particularly problematic when external systems expect [ISO-3166][3] codes.
    * Note: [Using ISO-3166 can be turned on for the entire organization and choosing states/countries from picklists.][4]


5. [Salesforce formats phone numbers this way.][5]


6. [Outbound Messages are retried independent of their order in the queue. This may result in messages being delivered out of order.][6]


7. [While each outbound message should be delivered at least once, it may be delivered more than once][6]


8. [The Login Limit is 3600 calls per user per hour.][7]
    * This has never come up for a real user, but it was a fun series of errors for the integrations user.


9. [Polymorphic relationships in SOQL queries have terrible error messages.][8]


10. [Upsert Salesforce Records by ExternalID is your friend.][9]
    * I have seen so many Salesforce forums advice downloading entire tables, and matching records up in Excel. This isn't reasonable for any large amount of data.  Even if it can be automated, it's still a lot of data being moved around.


11. The error message for updating a column in Salesforce is the same for both the absence of the field, and the lack of user permissions to access the field.


12. [Salesforce Trailhead is excellent platform training.][10]


13. Understand the [Salesforce Execution Governors and Limits.][11]

## Summary

Salesforce is becoming a pretty good platform, perhaps held back a little bit by legacy and non-breaking changes, but it's solid.

[0]: https://help.salesforce.com/articleView?id=000176281&type=1
[1]: https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_om_outboundmessaging_listener.htm
[2]: https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunitylineitem.htm
[3]: https://www.iso.org/iso-3166-country-codes.html
[4]: https://help.salesforce.com/articleView?id=admin_state_country_picklists_overview.htm&type=5
[5]: https://help.salesforce.com/articleView?id=000181563&language=en_US&type=1
[6]: https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_om_outboundmessaging_notifications.htm
[7]: https://help.salesforce.com/articleView?id=000233559&type=1
[8]: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_SOQL_polymorphic_relationships.htm
[9]: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_dml_examples_upsert.htm
[10]: https://trailhead.salesforce.com/en
[11]: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm
