import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

type SEOProps = {
    description?: string;
    lang?: string;
    meta?: Array<any>;
    keywords?: Array<string>;
    title: string;
}
function SEO({ description, lang, meta = [], keywords = [], title }: SEOProps) {
    return (
        <StaticQuery
            query={detailsQuery}
            render={(data) => {
                const metaDescription =
                    description || data.site.siteMetadata.description

                const metaInputs = [
                    {
                        name: `description`,
                        content: metaDescription,
                    },
                    {
                        property: `og:title`,
                        content: title,
                    },
                    {
                        property: `og:description`,
                        content: metaDescription,
                    },
                    {
                        property: `og:type`,
                        content: `website`,
                    },
                    {
                        name: `twitter:card`,
                        content: `summary`,
                    },
                    {
                        name: `twitter:creator`,
                        content: data.site.siteMetadata.author,
                    },
                    {
                        name: `twitter:title`,
                        content: title,
                    },
                    {
                        name: `twitter:description`,
                        content: metaDescription,
                    },
                    {
                        name: `google-site-verification`,
                        content: `SNLO-tYqpih0jQQDC5zaza2YElJBxXZV2h7juKIHb7c`,
                    },
                ]
                return (
                    <Helmet
                        htmlAttributes={{
                            lang,
                        }}
                        title={title ? title.toLowerCase() : ''}
                        titleTemplate={`%s ${
                            title ? `| ${data.site.siteMetadata.title}` : ''
                        }`}
                        meta={metaInputs
                            .concat(
                                keywords.length > 0
                                    ? {
                                          name: `keywords`,
                                          content: keywords.join(`, `),
                                      }
                                    : []
                            )
                            .concat(meta)}
                    >
                        <script
                            async
                            defer
                            data-domain="stephencharlesweiss.com"
                            src="https://plausible.io/js/plausible.js"
                        ></script>
                    </Helmet>
                )
            }}
        />
    )
}

export default SEO

const detailsQuery = graphql`
    query DefaultSEOQuery {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
