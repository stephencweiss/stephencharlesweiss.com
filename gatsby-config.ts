import type { GatsbyConfig } from 'gatsby'
import { isPublished } from './src/utils/dateFns'

const config: GatsbyConfig = {
    flags: {
        QUERY_ON_DEMAND: true,
        LAZY_IMAGES: true,
    },
    siteMetadata: {
        title: `/*code-comments*/`,
        author: `Stephen Weiss`,
        description: `notes on life and software.`,
        siteUrl: `https://stephencharlesweiss.com/`,
        social: {
            twitter: `stephencweiss`,
            github: `stephencweiss`,
        },
        menuOptions: [
            { label: 'blog', path: '/blog' },
            { label: 'about', path: '/about' },
            { label: 'other', path: '/others' },
        ],
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp', // Needed for dynamic images
        'gatsby-plugin-mdx', // to support mdx in addition to md
        'gatsby-plugin-netlify',
        'gatsby-plugin-typescript',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/notes`,
                name: `notes`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            className: `auto-link`,
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                    {
                        resolve: 'gatsby-remark-code-titles',
                        options: {
                            className: 'code-title',
                        },
                    },
                    {
                        resolve: `gatsby-remark-embed-snippet`,
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: '>',
                            aliases: {
                                sh: 'bash',
                                zsh: 'bash',
                                js: 'javascript',
                                jsx: 'javascript',
                                ts: 'typescript',
                                tsx: 'typescript',
                            },
                            noInlineHighlight: false,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 640,
                            showCaptions: true,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    { resolve: 'gatsby-remark-embedder' },
                    { resolve: 'gatsby-remark-reading-time' },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map((edge) => {
                                return Object.assign(
                                    {},
                                    edge.node.frontmatter,
                                    {
                                        date: edge.node.frontmatter.date,
                                        publish: edge.node.frontmatter.publish,
                                        updated: edge.node.frontmatter.updated,
                                        draft: edge.node.frontmatter.draft,
                                        url:
                                            site.siteMetadata.siteUrl +
                                            edge.node.frontmatter.slug,
                                        guid:
                                            site.siteMetadata.siteUrl +
                                            edge.node.frontmatter.slug,
                                        custom_elements: [
                                            {
                                                'content:encoded':
                                                    edge.node.html,
                                            },
                                        ],
                                    }
                                )
                            })
                        },
                        query: `
                  {
                    allMarkdownRemark(
                      limit: 1000,
                      sort: { order: DESC, fields: [fields___publishDate] },
                      filter: {fields: {isPublished: {eq: true}, sourceInstance: {eq: "notes"}}}
                    ) {
                      edges {
                        node {
                          excerpt
                          html
                          frontmatter {
                            title
                            date
                            publish
                            updated
                            slug
                          }
                        }
                      }
                    }
                  }
                `,
                        output: '/rss.xml',
                        title: 'Code-Comments RSS Feed',
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: `/* Code-Comments */`,
                short_name: `{CC}`,
                start_url: `/`,
                background_color: `#FDF6E3`,
                display: `minimal-ui`,
                icon: `content/assets/initials.svg`,
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
          `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map((edge) => {
                                return Object.assign(
                                    {},
                                    edge.node.frontmatter,
                                    {
                                        date: edge.node.frontmatter.date,
                                        publish: edge.node.frontmatter.publish,
                                        updated: edge.node.frontmatter.updated,
                                        draft: edge.node.frontmatter.draft,
                                        url:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        guid:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        custom_elements: [
                                            {
                                                'content:encoded':
                                                    edge.node.html,
                                            },
                                        ],
                                    }
                                )
                            })
                        },
                        query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [fields___publishDate] },
                  filter: {fields: {isPublished: {eq: true}, sourceInstance: {eq: "notes"}}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        publish
                        updated
                      }
                    }
                  }
                }
              }
            `,
                        output: '/rss.xml',
                        title: 'Code-Comments RSS Feed',
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-styled-components',
            options: {
                displayName: true,
            },
        },
        'gatsby-plugin-sass', // to eventually replace styled-components?
        'gatsby-plugin-offline',
        'gatsby-plugin-react-helmet',
        {
            resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
            options: {
                // Fields to index
                fields: [
                    { name: `title`, store: true, attributes: { boost: 20 } },
                    `category`,
                    `date`,
                    `publish`,
                    `tags`,
                    `title`,
                    `updated`,
                ],
                // How to resolve each field`s value for a supported node type
                resolvers: {
                    // For any node of type MarkdownRemark, list how to resolve the fields` values
                    MarkdownRemark: {
                        content: (node: any) => node.rawMarkdownBody, // not sure this one's working yet...
                        category: (node: any) => node.frontmatter.category,
                        date: (node: any) => node.frontmatter.date,
                        path: (node: any) => node.fields.slug,
                        publish: (node: any) => node.frontmatter.publish,
                        slug: (node: any) =>
                            node.frontmatter.slug || node.fields.slug,
                        tags: (node: any) => node.frontmatter.tags,
                        title: (node: any) => node.frontmatter.title,
                        updated: (node: any) => node.frontmatter.updated,
                    },
                },
                filter: (node: any) => {
                    if (
                        node.internal.type !== 'MarkdownRemark' ||
                        node?.fields?.sourceInstance === 'notes'
                    )
                        return false
                    return isPublished(node)
                },
            },
        },
        {
            resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
            options: {
                production: true,
                disable: !process.env.ANALYZE_BUNDLE_SIZE,
                generateStatsFile: true,
                analyzerMode: 'static',
            },
        },
        {
            resolve: 'gatsby-source-xkcd',
            options: {
                comicQuantity: 5,
                latest: true,
            },
        },
        {
            resolve: 'gatsby-plugin-netlify',
            options: {
                mergeCachingHeaders: false,
            },
        },
    ],
}

export default config
