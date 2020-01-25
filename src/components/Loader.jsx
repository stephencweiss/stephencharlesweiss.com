import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}`

export const Loader = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #767676;
  border-radius: 50%;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  animation: ${spin} 0.6s linear infinite;
`

Loader.defaultProps = {
  size: '2.28571429rem',
}

const CenteredDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CenteredLoader = () => (
  <CenteredDiv>
    <Loader />
  </CenteredDiv>
)
export default Loader
