---
title: 'Debugging: Dev.To RSS-To-Draft Only Displaying Post Summaries (Wordpress Solution)'
date: '2018-12-23'
category: ['programming']
tags: ['debugging', 'dev.to', 'error handling', 'rss']
---

# Preamable

I’m filing this under the category of: "Issues that I created for myself and don’t want to forget how I solved." Also, I don’t want to be `DenverCoder9`.

|          ![](https://imgs.xkcd.com/comics/wisdom_of_the_ancients.png)          |
| :----------------------------------------------------------------------------: |
| _Relevant XKCD: Don't be DenverCoder9_ (Source: [XKCD](https://xkcd.com/979/)) |

# Dev.to Drafts Only Showing Post Summary

`Dev.to` can subscribe to the RSS feed of your blog which makes cross-publishing your posts easy.

When I first set mine up, however, I noticed that I wasn’t actually getting the full post, but only a blurb.

![](./devto-screengrab.png)

As much as I would have loved to point the finger elsewhere, the problem was with my settings.

My main site is built on Wordpress and my feed was set up to only share a summary. Fortunately it’s an easy fix (which Wordpress walks through [here](https://en.support.wordpress.com/settings/reading-settings/)).

Let's go through the steps.

# Update your RSS Feed Settings

Wordpress makes changing your RSS feed settings an easy three-step process.

1. Go to your admin panel’s reading settings (Dashboard > Settings > Reading) `text> https://www.<your-blog-here>.com/wp-admin/options-reading.php`
2. Change the setting "For each article in a feed, show" from "Summary" to "Full text"

![Wordpress RSS Feed Settings](./wordpress-settings.png)

3. Save changes

# To refresh your `Dev.to` drafts

Now that you've updated Wordpress, we need to go back to `Dev.to` and reset the feed.

1. Return to your settings on `Dev.to` at https://dev.to/settings/publishing-from-rss
2. Click on Publishing from RSS
3. (Re)Submit and wait.

> Your feed will be fetched every time you submit this form and updates will be automatically fetched periodically thereafter.

The process may take a few minutes, so be patient.

(I did go through and delete all of the old drafts, though I don't know if that helped / hurt the process.)

Thanks for reading! Hope this helps you avoid the same problems I had!
