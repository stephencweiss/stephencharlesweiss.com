import React from 'react'
import { useXkcd } from '../hooks/useXkcd'
import { ImageCarousel } from '../components/ImageCarousel'
import Layout from '../components/Layout'
import { useAsync } from 'react-use'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { Title } from '../components/Headers'

export function XKCDGallery(props) {
  const { title } = useSiteMetadata()
  const xkcdComics = useAsync(() => {
    return useXkcd({ comicQty: 5 }).then(res => Promise.all(res))
  }, [])

  if (xkcdComics.loading) {
    return <div>loading...</div>
  }
  if (xkcdComics.error) {
    return <div>eek! an error!</div>
  }
  return (
    <Layout location={props.location} title={title}>
      <Title> XKCD Daily Digest </Title>
      <ImageCarousel images={xkcdComics.value} />
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
    </Layout>
  )
}

export default XKCDGallery
