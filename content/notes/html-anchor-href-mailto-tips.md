---
title: 'Email Templates In Anchor Tag HRef'
date: '2019-11-15'
publish: '2019-12-01'
category: ['programming']
tags: ['email', 'mailto', 'html', 'anchor tag', 'template']
---

I was looking to plan an event recently at [Beermiscuous](https://beermiscuous.com/), a beer cafe in Chicago that I really like.

Their event inquiry is a simple process that’s initiated with an email.

Instead of trying to communicate the information they need on the website and then hoping folks will follow directions, they embedded some simple information into the anchor tag’s `href`.

Previously, nearly every example I’d seen of an anchor with an href that pointed to a mailto was the most primitive of examples. Something like:

```html
<a href="mailto">Share</a>
```

Which produces a link that looks like this: <a href="mailto">Share</a>

It had never dawned on me that you could put more information into the link, but that’s exactly what Beermiscuous did!

They had specified a mailbox as the recipient, i.e. the mailto. They also had a subject and body. The full example is here:

```html
<a href=“mailto:events@beermiscuous.com?subject=Event%20Inquiry&amp;body=PLEASE%20COMPLETE%20ALL%20QUESTIONS%0AFull%20Name:%0APhone%20Number:%0AProposed%20Date:%0AStart/End%20Time:%0AEstimated%20Number%20Of%20Attendees:%0ACellar%20or%20Back%20Cafe:%0ANature%20of%20Event:%0AOther%20Notes%20About%20Event:">HERE</a>
```

This creates a very pleasant user experience where the user clicks on the link and most of the work on the email is already done! They just need to add the specific details only they can add.

![email template](https://res.cloudinary.com/scweiss1/image/upload/v1593203601/email-template_vtepuj.png)

As MDN points out in [Creating Hyperlinks](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks), a page within their Introduction to HTML guide, any standard mail header fields (as well as body) can be added to the `mailto` URL. Examples include “subject”, “cc”, “bcc”, etc.

> **Note:** The values of each field must be URL-encoded, that is with non-printing characters (invisible characters like tabs, carriage returns, and page breaks) and spaces [percent-escaped](http://en.wikipedia.org/wiki/Percent-encoding) . Also note the use of the question mark (?) to separate the main URL from the field values, and ampersands (&) to separate each field in the mailto: URL. This is standard URL query notation. Read [The GET method](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data#The_GET_method) to understand what URL query notation is more comonly used for.
