import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const BioContainer = styled.div`
    margin-bottom: calc(1.25 * 1em * 2.5);
    margin-top: calc(1.25 * 1em * 2.5);
`

function Bio() {
    return (
        <BioContainer>
            <p>
                Hi there and thanks for reading! My name's Stephen. I live in Chicago with my
                wife, Kate, and dog, Finn. Want more? See&nbsp;
                <Link to="/about">about</Link> and get in touch!
            </p>
        </BioContainer>
    )
}

export default Bio
