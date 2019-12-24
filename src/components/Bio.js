import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import styled from 'styled-components'

const Image = styled(GatsbyImage)`
  margin: 0;
  margin-right: 0.75em;
  margin-bottom: 0;
  min-width: 50;
  border-radius: 100%;
  * > img {
    margin: 0;
  }
`

const BioContainer = styled.div`
  display: flex;
  margin-bottom: calc(1.25 * 1em * 2.5);
  margin-top: calc(1.25 * 1em * 2.5);
`
// TODO: Style

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <BioContainer
            style={{
              display: `flex`,
            }}
          >
            <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
            <p>
              Thanks for reading! My name's <strong>{author}</strong>. I live in
              Chicago with my wife, Kate, and dog, Finn.
              <br />
              <a href={`https://tinyletter.com/stephencharlesweiss/archive`}>
                Click here to see the archives of my weeks in review and sign up
                yourself!
              </a>
            </p>
          </BioContainer>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
