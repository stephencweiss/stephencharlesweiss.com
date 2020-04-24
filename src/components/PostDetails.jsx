import React from 'react'
import styled from 'styled-components'

export const Details = styled.h5`
    display: inline;
    color: #606060;
`

export const DetailsWrapper = styled.div`
    padding-left: 0.5rem;
`

export function PostDetails({ date, estimate, wordCount }) {
    return (
        <DetailsWrapper>
            <Details>{date}</Details>
            &nbsp;|&nbsp;
            <Details>
                {estimate}, {wordCount} words
            </Details>
        </DetailsWrapper>
    )
}
