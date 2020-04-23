import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const BlurbContainer = styled.div`
    padding-left: 0.5rem;
`

const RightAdjustLink = styled(Link)`
    display: flex;
    flex-direction: row-reverse;
`

export const Blurb = ({ content, path }) => (
    <BlurbContainer>
        <p>
            {content && content.length > 200
                ? content.slice(0, 200).concat(' ...')
                : content}
        </p>
        <RightAdjustLink to={`/${path}`}>&#10149;{`Read more`}</RightAdjustLink>
    </BlurbContainer>
)
