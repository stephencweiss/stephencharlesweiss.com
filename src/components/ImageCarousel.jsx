import React from 'react'
import styled from 'styled-components'

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export function ImageCarousel({ images }) {
  return (
      images.map((image, index) => {
        const { link, num, img, title, alt } = image
        return (
          <ImageWrapper key={num} index={index}>
            {link && <a href={link}>{`# ${num}: ${title}`}</a>}
            <img src={img} alt={alt} />
          </ImageWrapper>
        )
      })
  )
}
