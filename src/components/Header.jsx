import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { NavLink, LinkWrapper } from './index'

const SiteHeader = styled.header`
    background: transparent;
    display: flex;
    align-content: center;
    justify-content: center;
`
export function Header({ menuOptions }) {
    const location = useLocation()
    const activatedMenu = menuOptions && location ? findActiveOption(menuOptions, location) : []
    return (
        <SiteHeader>
            <LinkWrapper>
                {activatedMenu.map(({ label, path, active }) => {
                    return (
                        <NavLink active={active} to={path}>
                            {label}
                        </NavLink>
                    )
                })}
            </LinkWrapper>
        </SiteHeader>
    )
}

/**
 * A function to analyze the current menu options against location and update the items with an active flag.
 * @param {Array} menuOptions - an array of menu items defined in the gatsby-config
 * @param {Object} location - the current location object from @reach/router
 * @returns {Array} - an array of menuOptions that are noted whether they are active currently or not.
 */
function findActiveOption(menuOptions, location) {
    return menuOptions.map(option => {
        const { path, label } = option
        if (label === 'home' && location.pathname === path) {
            option.active = true
        } else if (label === 'about' && location.pathname === path) {
            option.active = true
        } else if (label === 'blog' && location.pathname.includes(path)) {
            option.active = true
        } else if (
            label === 'other' &&
            location.pathname !== '/' &&
            !location.pathname.includes('about') &&
            !location.pathname.includes('blog')
        ) {
            option.active = true
        } else {
            option.active = false
        }
        option.active = option.active.toString()
        return option
    })
}
