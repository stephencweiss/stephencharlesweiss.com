import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout, SEO } from '../components'
import styled from 'styled-components'

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

type XKCDImage = {
    num: number;
    img: string;
    title: string;
    alt: string;
    transcript: string
}
type XKCDResponse = {
    latest: XKCDImage
    comicQuantity: Array<XKCDImage>
}
type Gallery = {
    data: {
        allXkcd: {
            nodes: Array<XKCDResponse>}
        }
}

export function XKCDGallery(props: Gallery) {

    const node: XKCDResponse = props.data.allXkcd.nodes[0] ?? {} as XKCDResponse
    const { comicQuantity, latest } = node ;
    const xkcdComics = [latest, ...comicQuantity]

    return (
        <Layout>
            <SEO title="xkcd" keywords={['comics', 'xkcd']} />
            <h1>
                xkcd daily digest<sup>1</sup>
            </h1>
            {xkcdComics.map((image) => {
                const { num, img, title, alt, transcript } = image
                const link = `https://xkcd.com/${num}`
                return (
                    <ImageWrapper key={num}>
                        <a href={link}>{`# ${num}: ${title}`}</a>
                        <img
                            src={img}
                            alt={`Alt: ${alt}. Transcript: ${transcript}`}
                        />
                    </ImageWrapper>
                )
            })}
            <p>
                <em>Why this page exists</em>
            </p>
            <p>
                I love Randall Munroe's XKCD comic. Maybe too much. If I go to
                xkcd.com, I can blink and an hour will have passed. This page is
                intended to allow me to keep up to date while also catching the
                backlog... overtime.
            </p>
            <p>
                This is a true digest. I cannot press random. There is no
                refresh to get a new set of comics, no infinite scroll, no easy
                rush of endorphines.
            </p>
            <footer>
                <h2>Footnotes</h2>
                <ul>
                    <li>
                        <p>
                            <sup>1</sup>I wrote about building this page on my
                            blog. You can find it&nbsp;
                            <Link to="/blog/2020-01-25/building-xkcd-daily-digest">
                                here
                            </Link>
                            .
                        </p>
                    </li>
                </ul>
            </footer>
        </Layout>
    )
}

export default XKCDGallery

export const xkcdPageQuery = graphql`
    query LatestXkcd {
        allXkcd {
            nodes {
                id
                latest {
                    month
                    num
                    link
                    year
                    news
                    safe_title
                    transcript
                    alt
                    img
                    title
                    day
                }
                comicQuantity {
                    month
                    num
                    link
                    year
                    news
                    safe_title
                    transcript
                    alt
                    img
                    title
                    day
                }
            }
        }
    }
`
