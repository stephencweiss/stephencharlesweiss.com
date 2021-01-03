import React from 'react'
import { graphql, Link } from 'gatsby'
import { Bio, Layout, SEO } from '../components'

function Stats(props) {
    const entry = props.data.markdownRemark

    return (
        <Layout>
            <SEO title="Site Statistics" keywords={['stats', 'analytics']} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Site Statistics</h1>
            </div>
            <p>
                These site statistics are calculated using&nbsp;
                <a href="">
                    <code>cloc</code>
                </a>
                .
            </p>
            <p>
                They are compiled with each build of the site to remain up to
                date.
            </p>
            <p>
                For more about <code>cloc</code> and how I'm using it, please
                see{' '}
                <Link to="cloc-code-statistics">
                    my blog post on the motivation for this page
                </Link>
                .
            </p>

            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
            <hr />
            <Bio />
            <Link to={'/'} rel="home">
                &lArr; Go Back To Home
            </Link>
        </Layout>
    )
}

export default Stats

export const pageQuery = graphql`
    query StatsBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date
                publish
            }
        }
    }
`
