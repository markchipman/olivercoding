//github.com/Vagr9K/gatsby-advanced-starter/blob/master/data/SiteConfig.js
https: module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  siteTitle: "Oliver Coding", // Site title.
  siteTitleAlt: "Oliver Coding", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://olivercoding.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "A blog dedicated to all computer science.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-105869212-1", // GA tracking ID.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Daniel Oliver", // Username to display in the author segment.
  userTwitter: "a_software_dev", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Tennessee", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription: "I love all things computer science", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/DanielOliver/",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/a_software_dev",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:danieloliversoftware@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2017. Oliver Coding", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c9b64c", // Used for setting manifest and progress theme colors.
  backgroundColor: "#687ba0" // Used for setting manifest background color.
};
