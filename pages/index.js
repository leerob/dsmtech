import React from 'react';
import {createGlobalStyle} from 'styled-components';

import Button from '../components/Button.js';
import Card from '../components/Card';
import Grid from '../components/Grid.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

import {COMPANIES} from '../companies';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  text-rendering: optimizeLegibility;

  @font-face {
    font-family: "Circular Std";
    src: url("/static/fonts/CircularStd-Bold.otf");
  }

  @font-face {
    font-family: "Rubik";
    src: url("/static/fonts/Rubik-Light.ttf");
  }
`;

const formatName = (name) => name.replace('and', '&');

const formatFilePath = (name) => name.replace(/ /g, '_').toLowerCase();

const createCard = (company) => (
    <Card key={company.name}>
        <Card.Header>
            <Card.Image alt={formatName(company.name)} src={`/static/imgs/${formatFilePath(company.name)}.jpg`} />
            <Card.Logo alt={formatName(company.name)} src={`/static/logos/${formatFilePath(company.name)}.jpg`} />
            <Card.Category>{company.category}</Card.Category>
            <Card.Title>{formatName(company.name)}</Card.Title>
        </Card.Header>
        <Card.Text>{company.description}</Card.Text>
        <Card.Footer>
            <div>
                <Card.SocialLink type="instagram" url={company.instagram} />
                <Card.SocialLink type="twitter" url={company.twitter} />
                <Card.SocialLink type="facebook" url={company.facebook} />
                <Card.SocialLink type="linkedin" url={company.linkedin} />
            </div>
            <Button as="a" href={company.careers} target="_blank">
                {'View Jobs'}
            </Button>
        </Card.Footer>
    </Card>
);

const Page = () => (
    <React.Fragment>
        <GlobalStyle />
        <Header />
        <Grid>{COMPANIES.map((company) => createCard(company))}</Grid>
        <Footer />
    </React.Fragment>
);

export default Page;
