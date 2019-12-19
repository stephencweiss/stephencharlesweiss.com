import React from 'react'
import GlobalStyle from '../styles/GlobalStyle'

export default ({ element }) => {
    return (
        <React.Fragment>
            <GlobalStyle />
            {element}
        </React.Fragment>
    )
}