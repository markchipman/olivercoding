---
path: "2017-09-17-new-blog-setup"
date: "2017-09-17"
title: "New Blog Setup"
excerpt: "Setting up advanced Gatsby JS"
category: "tech"
tags:
    - Blog
    - NPM
    - GatsbyJS
---

Last week I set up a new blog with GatsbyJS using [this tutorial][0] and it has been an excellent starting point.

This week I tore it all down and rebuilt it from this [GatsbyJS Advanced Starter][1]. I took some effort to ensure no visible differences.

The change was pretty smooth except when I got to NPM Install, for these packages requiring one additional dependency.
```json
    "gatsby-remark-images": "^1.5.11",
    "gatsby-plugin-sharp": "^1.6.7"
```
This additional dependency comes from [the windows build tools][2] which can be installed with this line.
```bash
npm install --global --production windows-build-tools
```

<br/>
<br/>

The vast majority of setting up the advanced starter just works, and consists of changing the ready-made config to match your own domain, your own email, your own twitter, etc.

<br/>

One issue I found was the link to the [RSS subscribe][3] in the supplied Footer ReactJS component. This uses the [gatsby-link package][4] which allows GatsbyJS to intercept any links to the same site in the GatsbyJS link. The issue is that the "rss.xml" page is not part of the GatsbyJS site proper, so it will spin and then show a 404.
```javascript
import Link from "gatsby-link";
```
```javascript
    const url = config.siteRss;
```
```html
          <Link to={url}>
            <button>Subscribe</button>
          </Link>
```
This can be fixed by doing this to open "rss.xml" in a new window. This can be tested by the subscribe button on the bottom right of this page.
```html
          <a href={url} target="_blank">
            <button>Subscribe</button>
          </a>
```

<br/>
<br/>




[0]: https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/
[1]: https://github.com/Vagr9K/gatsby-advanced-starter
[2]: https://github.com/felixrieseberg/windows-build-tools
[3]: https://github.com/Vagr9K/gatsby-advanced-starter/blob/e2e2f81ae4675f90fd71455ac229c86b1434058f/src/components/Footer/Footer.jsx#L22
[4]: https://www.npmjs.com/package/gatsby-link


