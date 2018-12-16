import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    background-image: linear-gradient(to bottom right, #ff5f6d, #ffc371);
    height: 500px;
    position: relative;
`;

const BottomAngle = styled.svg`
    bottom: 0;
    height: 10vw;
    position: absolute;
    width: 100%;
`;

const Title = styled.h1`
    color: white;
    color: white;
    font-family: 'Circular Std';
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
    padding: 180px 50px 0;
    position: relative;
    text-align: center;

    @media only screen and (max-width: 900px) {
        padding: 160px 100px 0;
    }

    @media only screen and (max-width: 608px) {
        padding: 150px 80px 0;
    }

    @media only screen and (max-width: 463px) {
        padding: 100px 50px 0;
    }

    @media only screen and (max-width: 362px) {
        font-size: 2.5rem;
        padding: 120px 50px 0;
    }
`;

const Subtitle = styled.div`
    color: white;
    color: white;
    font-family: 'Rubik';
    font-size: 1.5rem;
    margin: 0;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 20px;
    position: relative;
    text-align: center;
`;

const HeaderComponent = () => (
    <Header>
        <Title>{'The best tech jobs in Des Moines 🎉'}</Title>
        <Subtitle>{'Find your dream job today.'}</Subtitle>
        <BottomAngle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path fill="#fff" d="M0 100L100 0v100z" stroke="white" />
        </BottomAngle>
    </Header>
);
export default HeaderComponent;
