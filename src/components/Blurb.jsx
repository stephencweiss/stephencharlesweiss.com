import React from 'react'
import styled from 'styled-components'

const BlurbContainer = styled.div`
    padding-left: 0.5rem;
`

export const Blurb = ({ content}) => (
    <BlurbContainer>
        <p>
            {content && content.length > 200
                ? content.slice(0, 200).concat(' ...')
                : content}
        </p>
    </BlurbContainer>
)
