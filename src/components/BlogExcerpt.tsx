import React from 'react'
import { Link } from 'gatsby'
import { Blurb, PostDetails, PostTitleLink } from '.'
import styled from 'styled-components'

const ContentWrapper = styled.div`
    padding-bottom: 1.5em;
    :last-of-type {
        padding-bottom: 0em;
    }
`
const RightAdjustDiv = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

export function BlogExcerpt({ node }) {
    const { title, slug, publish } = node.frontmatter
    const { readingTime } = node.fields
    const { words: wordCount, text: estimate } = readingTime
    const { excerpt } = node
    return (
        <ContentWrapper>
            <PostTitleLink slug={`/${slug}`} title={title} />
            <PostDetails
                date={publish}
                estimate={estimate}
                wordCount={wordCount}
            />
            <Blurb content={excerpt} />
            <RightAdjustDiv>
                <Link to={`/${slug}`}>&#10149;{`Read more`}</Link>
            </RightAdjustDiv>
        </ContentWrapper>
    )
}
