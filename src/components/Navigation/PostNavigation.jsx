import React from 'react'
import styled from 'styled-components'
import { NavLink } from '../index'

const List = styled.ul`
    display: flex;
    justify-content: space-around;
    margin: 0;

    @media screen and (max-width: 30em) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const ListItem = styled.li`
    flex: 1;
    text-align: ${({ align }) => (align ? align : '')};

    @media screen and (max-width: 30em) {
        padding: 1em 0;
        max-width: 80vw;
    }
`

function PostNavigation(props) {
    const { previous, next } = props
    return (
        <List>
            {previous && (
                <ListItem align={'left'}>
                    <NavLink to={previous.fields.slug} rel="prev">
                        &lArr; Previous: {previous.frontmatter.title}
                    </NavLink>
                </ListItem>
            )}
            {next && (
                <ListItem align={'right'}>
                    <NavLink to={next.fields.slug} rel="next">
                        Next: {next.frontmatter.title} &rArr;
                    </NavLink>
                </ListItem>
            )}
        </List>
    )
}

export default PostNavigation
