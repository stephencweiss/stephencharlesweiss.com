import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Layout, SEO } from '../components'

export default function About(props) {
    const { data } = props
    return (
        <Layout>
            <SEO title="about" keywords={['stephen charles weiss', 'about']} />
            <h1>about</h1>
            <p>I suppose it makes sense to say a little about myself.</p>
            <p>
                Let's start with the good stuff. Here's a photo of me and my
                puppy, Finn, when he was 12 weeks old.
            </p>
            <Img
                fluid={data.file.childImageSharp.fluid}
                alt={'a photo of me and finn at 12 weeks'}
            />
            <br />
            <p>Still interested in learning more? A decent starting place:</p>
            <ul>
                <li key="write">
                    I write a lot, mostly about things I'm learning, which
                    lately has been a lot of coding, at&nbsp;
                    <Link to={'/blog'}>/*code-comments*/</Link>.
                </li>
                <li key="public">
                    I believe in working in public, so as much as possible, you
                    can find my experiments and projects on&nbsp;
                    <a href={'https://github.com/stephencweiss'}>Github</a>.
                </li>
                <li key="reading">
                    I like reading too. I keep a&nbsp;
                    <Link to={'/list/bookshelf'}>reading list</Link> of what
                    I've read, as well as what I'm <Link to={'/list/reading-list'}>planning to read</Link>. Check it
                    out. I'm always looking for suggestions. Thank you&nbsp;
                    <a href={'https://github.com/mariellefoster/marf-books'}>
                        Marielle for setting an incredible example
                    </a>
                    .
                </li>
            </ul>
            <p>
                If you want to get in touch, I'm available at stephencweiss at
                gmail dot com.
            </p>
        </Layout>
    )
}

export const aboutPageQuery = graphql`
    query {
        file(relativePath: { eq: "profile-with-finn.jpeg" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid_withWebp
                    ...GatsbyImageSharpFluid_tracedSVG
                }
            }
        }
    }
`
