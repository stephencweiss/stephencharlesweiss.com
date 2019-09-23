---
title: 'Programmatic Page Generation'
date: '2019-08-04'
category: ['programming']
tags: ['gatsby', 'graphql', 'actions', 'createPage']
---
Alright, I’ve been building to this point! Time to generate new pages for a blog programmatically using Gatsby!

Previously I wrote about configuring Gatsby’s `gatsby-source-filesystem` plugin<sup>1</sup> and writing GraphQL queries that take  variables.<sup>2</sup> This post will combine these two lessons to generate pages to follow a simple layout for each post in my filesystem.

This post begins assuming a configured  `gatsby-source-filesystem` and at the point where I’m ready to set up my `gatsby-node` file to create pages.

First, the `gatsby-node` is one of several files that Gatsby looks for in the root directory (`gatsby-config` is another as an example).

Gatsby comes with a suite of built-in plugins. To make use of any of them, you export them from the `gatsby-config` file. I’ll be using the `createPages` asynchronous operation.

For example:
``` javascript
exports.createPages = async ({ actions, graphql, reporter }) => {
  // In node (which this is), graphql is a function that takes a string.
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic('failed to create posts', result.errors);
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach(post => {
    const path = post.frontmatter.slug;
    actions.createPage({
      path,
      component: require.resolve('./src/templates/post.js'),
      context: {
        slug: post.frontmatter.slug,
      },
    });
  });
};
```

Walking through this function:
1. I assign the value of `result` to the returned value of the GraphQL query. The returned result _is_ the slug. Notice that in `node` the GraphQL query is wrapped in `()`.
2. I check for errors (`result` returns a promise with a `.error` attribute <sup>3</sup>)
	* The Gatsby `reporter` is a built-in console log. `Panic` is an error state.
3. If I get past the error check, then I know I have at least something returned, which means that the I can pull out our nodes. In my very simple example so far - I have two:
![](&&&SFLOCALFILEPATH&&&E40FCF47-FD5C-4F81-AF07-8255FF1B226A.png)
4. Since it’s an array, I can now loop over it using a `forEach` to generate a page using Gatsby’s built-in `actions`.  Gatsby uses Redux to manage state and ships with a series of built in actions (of which `createPage` is one). <sup>4</sup>>

The `createPage` action API takes an object, and two optional parameters (`plugin` and `actionOptions` ) neither of which I need for this simple use case.

The object I identify has three things:
1. The path — which will be where the page I’m creating will live
2. The component — a path reference to, in this case, where I’ve saved a template for a post
3. The context — any context we will need for generating the component. This _could_ include the body and any assets for the post, however, in this example I’m putting that into the post itself and separating concerns a bit.

At this point, I’m ready to look at the `post` file I’ve noted as the component to in the action.

For example - a simple Post layout could look like:
``` javascript
import React from ‘react’;
import { graphql, Link } from ‘gatsby’;
import { MDXRenderer } from ‘gatsby-mdx’;
import Layout from ‘../components/layout’;

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
      }
      code {
        body
      }
    }
  }
`;

const PostTemplate = ({ data: { mdx: post } }) => {
  const { frontmatter, code } = post;

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <p style={{fontSize: '0.75rem'}}>
        {`posted by ${frontmatter.author}`}
      </p>
      <MDXRenderer>{code.body}</MDXRenderer>
      <Link to=“/“>Return to home</Link>
    </Layout>
  );
};

export default PostTemplate;
```

A few notes here:
The slug that’s being passed in from the `gatsby-node` configuration is the context with which I’m going to query for the data to generate the post.

I wrote my blog posts as `.mdx` files and resolve any `.mdx` or `.md` files using the `gatsby-mdx` plugin. The nice thing about doing this is that I can use the `MDXRenderer` to easily render the body of the posts.

What does all of this mean?

Any time I add a new post to my filesystem that is returned in my all MDX query in the node modules, it will get passed through to the a `createPage` action and rendered with the `MDXRenderer` in a basic format of:
1. Title
2. Author
3. Body
4. Return to home.

Pretty nifty!

* <sup>1</sup> [Getting Started With Gatsby-Source-Filesystem | /* Code Comments */](https://www.stephencharlesweiss.com/2019-07-20/gatsby-source-filesystem/)
* <sup>2</sup> [How To Use Variables GraphQL Queries | /* Code Comments */](https://www.stephencharlesweiss.com/2019-07-24/graphql-variable-queries/)
* <sup>3</sup>[Programmatically create pages from data | GatsbyJS](https://www.gatsbyjs.org/tutorial/part-seven/#creating-pages)
* <sup>4</sup>> [Actions | Gatsby](https://www.gatsbyjs.org/docs/actions/)
# Programmatic Page Generation
Alright, I’ve been building to this point! Time to generate new pages for a blog programmatically using Gatsby!

Previously I wrote about configuring Gatsby’s `gatsby-source-filesystem` plugin<sup>1</sup> and writing GraphQL queries that take  variables.<sup>2</sup> This post will combine these two lessons to generate pages to follow a simple layout for each post in my filesystem.

This post begins assuming a configured  `gatsby-source-filesystem` and at the point where I’m ready to set up my `gatsby-node` file to create pages.

First, the `gatsby-node` is one of several files that Gatsby looks for in the root directory (`gatsby-config` is another as an example).

Gatsby comes with a suite of built-in plugins. To make use of any of them, you export them from the `gatsby-config` file. I’ll be using the `createPages` asynchronous operation.

For example:
``` javascript
exports.createPages = async ({ actions, graphql, reporter }) => {
  // In node (which this is), graphql is a function that takes a string.
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic('failed to create posts', result.errors);
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach(post => {
    const path = post.frontmatter.slug;
    actions.createPage({
      path,
      component: require.resolve('./src/templates/post.js'),
      context: {
        slug: post.frontmatter.slug,
      },
    });
  });
};
```

Walking through this function:
1. I assign the value of `result` to the returned value of the GraphQL query. The returned result _is_ the slug. Notice that in `node` the GraphQL query is wrapped in `()`.
2. I check for errors (`result` returns a promise with a `.error` attribute <sup>3</sup>)
	* The Gatsby `reporter` is a built-in console log. `Panic` is an error state.
3. If I get past the error check, then I know I have at least something returned, which means that the I can pull out our nodes. In my very simple example so far - I have two:
![](&&&SFLOCALFILEPATH&&&E40FCF47-FD5C-4F81-AF07-8255FF1B226A.png)
4. Since it’s an array, I can now loop over it using a `forEach` to generate a page using Gatsby’s built-in `actions`.  Gatsby uses Redux to manage state and ships with a series of built in actions (of which `createPage` is one). <sup>4</sup>>

The `createPage` action API takes an object, and two optional parameters (`plugin` and `actionOptions` ) neither of which I need for this simple use case.

The object I identify has three things:
1. The path — which will be where the page I’m creating will live
2. The component — a path reference to, in this case, where I’ve saved a template for a post
3. The context — any context we will need for generating the component. This _could_ include the body and any assets for the post, however, in this example I’m putting that into the post itself and separating concerns a bit.

At this point, I’m ready to look at the `post` file I’ve noted as the component to in the action.

For example - a simple Post layout could look like:
``` javascript
import React from ‘react’;
import { graphql, Link } from ‘gatsby’;
import { MDXRenderer } from ‘gatsby-mdx’;
import Layout from ‘../components/layout’;

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
      }
      code {
        body
      }
    }
  }
`;

const PostTemplate = ({ data: { mdx: post } }) => {
  const { frontmatter, code } = post;

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <p style={{fontSize: '0.75rem'}}>
        {`posted by ${frontmatter.author}`}
      </p>
      <MDXRenderer>{code.body}</MDXRenderer>
      <Link to=“/“>Return to home</Link>
    </Layout>
  );
};

export default PostTemplate;
```

A few notes here:
The slug that’s being passed in from the `gatsby-node` configuration is the context with which I’m going to query for the data to generate the post.

I wrote my blog posts as `.mdx` files and resolve any `.mdx` or `.md` files using the `gatsby-mdx` plugin. The nice thing about doing this is that I can use the `MDXRenderer` to easily render the body of the posts.

What does all of this mean?

Any time I add a new post to my filesystem that is returned in my all MDX query in the node modules, it will get passed through to the a `createPage` action and rendered with the `MDXRenderer` in a basic format of:
1. Title
2. Author
3. Body
4. Return to home.

Pretty nifty!

* <sup>1</sup> [Getting Started With Gatsby-Source-Filesystem | /* Code Comments */](https://www.stephencharlesweiss.com/2019-07-20/gatsby-source-filesystem/)
* <sup>2</sup> [How To Use Variables GraphQL Queries | /* Code Comments */](https://www.stephencharlesweiss.com/2019-07-24/graphql-variable-queries/)
* <sup>3</sup>[Programmatically create pages from data | GatsbyJS](https://www.gatsbyjs.org/tutorial/part-seven/#creating-pages)
* <sup>4</sup>> [Actions | Gatsby](https://www.gatsbyjs.org/docs/actions/)

