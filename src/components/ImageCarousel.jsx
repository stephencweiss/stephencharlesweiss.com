import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Carousel from 'nuka-carousel'

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export function ImageCarousel({ images }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const carouselRef = useRef()
  function onLoad() {
    props.onLoad()
    carouselRef.current.focus()
  }
  return (
    <Carousel
      cellAlign="center"
      wrapAround
      enableKeyboardControls
      slideIndex={slideIndex}
      afterSlide={setSlideIndex}
      onLoad={onLoad}
    >
      {images.map((image, index) => {
        const { link, num, img, title, alt } = image
        return (
          <ImageWrapper key={num} index={index}>
            {link && <a href={link}>{`# ${num}: ${title}`}</a>}
            <img src={img} alt={alt} />
          </ImageWrapper>
        )
      })}
    </Carousel>
  )
}
