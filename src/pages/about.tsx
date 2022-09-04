import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import styled from 'styled-components'
import { Layout, SEO } from '../components'

export default function About(props: {data: {file: any}}) {
    const { data } = props
    const img = getImage(data.file)
    return (
        <Layout>
            <SEO title="about" keywords={['stephen charles weiss', 'about']} />
            <h1>about</h1>
            <p>I suppose it makes sense to say a little about myself.</p>
            <p>
                Let's start with the good stuff. Here's a photo of me and my
                puppy, Finn, when he was 12 weeks old.
            </p>
            {img && <GatsbyImage
                image={img}
                alt={'a photo of me and finn at 12 weeks'}
            />}
            <br />
            <p>
                The bottom line: I consider myself the luckiest guy in the
                world.
            </p>
            <p> Other interesting factoids: </p>
            <ul>
                <li>
                    My wife and I live in Chicago - which also happens to be
                    where we met.
                </li>
                <li>
                    I spend my days working as an engineer at&nbsp;
                    <a href="https://plaid.com/">Plaid</a>.
                </li>
                <li>
                    My nights and weekends are spent tinkering, playing,
                    reading, and writing.
                </li>
            </ul>

            <p>Want to know more? Look no further than this site:</p>
            <ul>
                <li key="write">
                    Get to know me from my writing. I like to write. While I've
                    focused in the past on writing about what I learn (lately a
                    lot about coding), I also write about books, philosophy,
                    economics, and really anything I find interesting. If it's
                    public (and it almost all is), it is published on my blog
                    &nbsp;<Link to={'/blog'}>/*code-comments*/</Link>.
                </li>
                <li key="public">
                    I believe in working in public. So, in addition to writing
                    about it, you'll find my experiments and projects on&nbsp;
                    <a href={'https://github.com/stephencweiss'}>Github</a>.
                </li>
                <li key="reading">
                    I like reading too. I keep a&nbsp;
                    <Link to={'/bookshelf'}>reading list</Link> of what
                    I've read, as well as what I'm planning to read (or not)
                    -&nbsp;
                    <Link to={'/antilibrary'}>my "anti-library"</Link>.
                    Check it out. I'm always looking for suggestions. Thank
                    you&nbsp;
                    <a href={'https://github.com/mariellefoster/marf-books'}>
                        Marielle for setting an incredible example
                    </a>
                    .
                </li>
            </ul>
            <p>
                If you want to get in touch, I'm available at&nbsp;
                <a href="mailto:stephencweiss@gmail.com">
                    stephencweiss@gmail.com
                </a>
                .
            </p>
        </Layout>
    )
}

export const aboutPageQuery = graphql`
    query {
        file(relativePath: { eq: "profile-with-finn.jpeg" }) {
            childImageSharp {
                gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
            }
        }
    }
`
