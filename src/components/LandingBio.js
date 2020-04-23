import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import initials from '../assets/initials.svg'
import { StyledLink } from './StyledLink'

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

const Description = styled.h2`
    padding: 0;
    margin-bottom: 1rem;
    font-size: 1.4rem;
`

const NameHeader = styled.h1`
    font-size: 3.5rem;
    margin-top: 0;
    margin-bottom: 0;
`

const Logo = styled.img`
    height: 100px;
    object-fit: contain;
`

const LandingBio = ({ title, description }) => {
    return (
        <OuterContainer>
            <Container>
                <Link to={'/blog'}>
                    <Logo src={initials} alt={'logo of initials'}/>
                </Link>
                <NameHeader>
                    <StyledLink to={'/blog'}>{title}</StyledLink>
                </NameHeader>
                <Description>{description}</Description>
                <p>
                    <em>written by Stephen Weiss</em>
                </p>
            </Container>
        </OuterContainer>
    )
}
export default LandingBio
