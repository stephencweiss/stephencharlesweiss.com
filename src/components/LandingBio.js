import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    text-align: center;
`

const OuterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    height: 78vh;
`

const Description = styled.p`
    padding: 0;
    margin-bottom: 1rem;
    font-size: 1.4rem;
`

const NameHeader = styled.h1`
    font-size: 3.5rem;
    margin-bottom: 0;
`

const LandingBio = ({ title, description }) => (
    <OuterContainer>
        <Container>
            <NameHeader>{title}</NameHeader>
            <Description>{description}</Description>
        </Container>
    </OuterContainer>
)

export default LandingBio
