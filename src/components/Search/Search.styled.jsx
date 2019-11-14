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
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
`

export const SearchContainer = styled.ul`
  border: 2px solid black;
  padding: 0 0.5em;
  margin: 0;
`