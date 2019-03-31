import React from 'react';
import styled from 'styled-components';

import Link from './Link';

const StyledNav = styled.nav`
    padding: 25px;
    box-shadow: 1px 1px 2px 0px #cfd8dc;
    font-family: 'Circular Std';
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white;
    z-index: 999;

    @media (min-width: 737px) {
        padding: 20px 4em;
    }
`;

const Logo = styled.img`
    height: 30px;
    padding-right: 2em;
    width: 30px;

    @media (min-width: 737px) {
        padding-right: 3em;
    }
`;

const NavLink = styled(Link)`
    color: #454a5d;
    font-size: 0.8em;
    letter-spacing: 0.03em;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.15s ease;

    :hover {
        color: #f65445;
    }

    @media (min-width: 737px) {
        font-size: 0.9em;
    }

    + a {
        margin: 0 0 0 2em;

        @media (min-width: 737px) {
            margin: 0 0 0 3em;
        }
    }
`;

const NavBar = () => (
    <StyledNav>
        <Logo src="/static/logo.svg" />
        <NavLink>{'Home'}</NavLink>
        <NavLink slug={'about'}>{'About'}</NavLink>
    </StyledNav>
);

export default NavBar;
