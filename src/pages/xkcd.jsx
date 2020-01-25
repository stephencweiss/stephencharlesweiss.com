import React from 'react'
import { Link } from 'gatsby'
import { useXkcd } from '../hooks/useXkcd'
import { ImageCarousel } from '../components/ImageCarousel'
import Layout from '../components/Layout'
import { CenteredLoader } from '../components/Loader'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { Title } from '../components/Headers'

export function XKCDGallery(props) {
  const { title } = useSiteMetadata()

  const { isLoading, isError, xkcdComics } = useXkcd({ comicQty: 5 })

  if (isError) {
    return <div>eek! an error!</div>
  }
  return (
    <Layout location={props.location} title={title}>
      <Title>
        XKCD Daily Digest<sup>1</sup>
      </Title>
      {isLoading ? <CenteredLoader /> : <ImageCarousel images={xkcdComics} />}
      <p>
        <em>Why this page exists</em>
      </p>
      <p>
        I love Randall Munroe's XKCD comic. Maybe too much. If I go to xkcd.com,
        I can blink and an hour will have passed. This page is intended to allow
        me to keep up to date while also catching the backlog... overtime.
      </p>
      <p>
        This is a true digest. I cannot press random. There is no refresh to get
        a new set of comics, no infinite scroll, no easy rush of endorphines.
      </p>
      <p>
        <a
          href={
            'https://github.com/FormidableLabs/nuka-carousel#keyboard-controls'
          }
        >
          Keyboard Controls
        </a>
      </p>
      <footer>
        <h2>Footnotes</h2>
        <ul>
          <li>
            <p>
              <sup>1</sup>I wrote about building this page on my blog. You can
              find it&nbsp;
              <Link to="/blog/2020-01-25/building-xkcd-daily-digest">here</Link>
              .
            </p>
          </li>
        </ul>
      </footer>
    </Layout>
  )
}

export default XKCDGallery
