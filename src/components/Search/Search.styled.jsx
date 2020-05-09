import styled from 'styled-components'

export const Item = styled.div`
    display: flex;
    flex-direction: column;
`

export const ItemHighlight = styled.small`
    background: rgba(0, 0, 0, 0.1);
    margin-left: 1em;
    padding-left: 0.5em;
`

export const ItemBlurb = styled.div`
  margin-left: 1em;
  padding-left .5em;
`

export const ListItem = styled.li`
    list-style: none;
`

export const SearchItemWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin: 1rem 0;
`

export const SearchInput = styled.input`
    flex: 1;
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.8);
    border-radius: 1rem;
    font-family: inherit;
    font-size: inherit;
`

export const SearchResultsContainer = styled.ul`
    padding: 0 0.5em;
    margin: 0;
`
