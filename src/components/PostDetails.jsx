import React from 'react'
import styled from 'styled-components'

export const Details = styled.h5`
    display: inline;
    color: #606060;
`

export const DetailsWrapper = styled.div`
    margin: 0.5rem 0 0;
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
