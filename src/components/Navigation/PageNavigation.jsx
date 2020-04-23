import React from 'react'
import styled from 'styled-components'
import { StyledLink } from '../index'

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    margin: 1rem 0;
`

const ListItem = styled.li`
    flex: 1;
    text-align: ${({ align }) => (align ? align : '')};
`

function PageNavigation(props) {
    const { previous, next } = props
    return (
        <List>
            {previous && (
                <ListItem align={'left'}>
                    <StyledLink to={previous} rel="prev">
                        &lArr; Previous Page
                    </StyledLink>
                </ListItem>
            )}
            {next && (
                <ListItem align={'right'}>
                    <StyledLink to={next} rel="next">
                        Next Page &rArr;
                    </StyledLink>
                </ListItem>
            )}
        </List>
    )
}

export default PageNavigation
