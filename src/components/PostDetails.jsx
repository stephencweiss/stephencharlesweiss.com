import React from 'react'
import styled from 'styled-components'

export const Details = styled.p`
    display: inline;
    color: rgb(70, 70, 70);
    margin: 0;
`

export const DetailsWrapper = styled.div`
    padding-left: 0.5rem;
`

export function PostDetails({ date, estimate, wordCount }) {
    return (
        <DetailsWrapper>
            <Details>{date}</Details>
            &nbsp;|&nbsp;
            <Details>~{estimate}</Details>
            &nbsp;|&nbsp;
            <Details>{wordCount} words</Details>
        </DetailsWrapper>
    )
}
