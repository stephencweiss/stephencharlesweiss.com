import React from 'react'
import styled from 'styled-components'

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export function ImageGallery({ images }) {
  return images.map((image, index) => {
    const { num, img, title, alt, transcript } = image
    const link = `https://xkcd.com/${num}`
    return (
      <ImageWrapper key={num} index={index}>
        <a href={link}>{`# ${num}: ${title}`}</a>
        <img src={img} alt={`Alt: ${alt}. Transcript: ${transcript}`} />
      </ImageWrapper>
    )
  })
}
