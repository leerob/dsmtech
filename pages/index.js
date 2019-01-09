import React from 'react';
import {event} from 'next-ga/dist/analytics/prod';

import {formatName, formatFilePath, GlobalStyle} from '../components/utils';
import Button from '../components/Button.js';
import Card from '../components/Card';
import Grid from '../components/Grid.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

import {COMPANIES} from '../companies';

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
                <Card.SocialLink name={company.name} type="instagram" url={company.instagram} />
                <Card.SocialLink name={company.name} type="twitter" url={company.twitter} />
                <Card.SocialLink name={company.name} type="facebook" url={company.facebook} />
                <Card.SocialLink name={company.name} type="linkedin" url={company.linkedin} />
            </div>
            <Button as="a" href={company.careers} target="_blank" onClick={() => event('Careers Link', company.name)}>
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
