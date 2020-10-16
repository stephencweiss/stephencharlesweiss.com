import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

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
            {dayjs(date).isValid() && (
                <>
                    <Details>{dayjs(date).format('YYYY-MM-DD')}</Details>
                    &nbsp;|&nbsp;
                </>
            )}
            <Details>~{estimate}</Details>
            &nbsp;|&nbsp;
            <Details>{wordCount} words</Details>
        </DetailsWrapper>
    )
}
