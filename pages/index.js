import React from 'react';
import styled from 'styled-components';

import {GlobalStyle} from '../components/utils';
import NavBar from '../components/NavBar';
import Link from '../components/Link';

const Container = styled.div`
    padding: 120px 24px 24px 24px;
    font-family: 'Rubik';
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    flex: 1;
    margin: 0 auto;
    max-width: 690px;
    width: 100%;
    display: flex;
    align-items: center;
    height: calc(100vh - 190px);
    flex-direction: column;

    @media (min-width: 737px) {
        flex-direction: row;
    }
`;

const Svg = styled.img`
    max-width: 300px;
    width: 100%;
    display: flex;
    margin: 0 auto;
    padding-right: 50px;
`;

const Description = styled.h1`
    width: 400px;
    font-size: 24px;
`;

const Button = styled(Link)`
    background: none;
    border-radius: 4px;
    border: 1px solid #0524d2;
    color: #0524d2;
    cursor: pointer;
    font-family: 'Rubik';
    font-size: 0.8rem;
    letter-spacing: 1px;
    padding: 5px 15px;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.15s ease;

    :hover {
        color: white;
        background: #0524d2;
    }
`;

const Page = () => (
    <>
        <GlobalStyle />
        <NavBar removeBg />
        <Container>
            <Svg src="/static/startup.svg" />
            <div>
                <Description>{'The best tech companies and startups in the Greater Des Moines area.'}</Description>
                <Button slug={'companies'}>{'Explore Companies'}</Button>
            </div>
        </Container>
    </>
);

export default Page;
