import React from 'react';

import Button from '../components/Button.js';
import Card from '../components/Card';
import Grid from '../components/Grid.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Icon from '../components/Icon';

import {COMPANIES} from '../companies';

const formatName = (name) => name.replace('_', ' ');

const formatFilePath = (name) => name.replace(' ', '_').toLowerCase();

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
                <a href={`https://www.instagram.com/${company.instagram}`} target="_blank">
                    <Icon src="/static/icons/instagram.svg" />
                </a>
                <a href={`https://www.twitter.com/${company.twitter}`} target="_blank">
                    <Icon src="/static/icons/twitter.svg" />
                </a>
                <a href={`https://www.facebook.com/${company.facebook}`} target="_blank">
                    <Icon src="/static/icons/facebook.svg" />
                </a>
                <a href={`https://www.linkedin.com/company/${company.linkedin}`} target="_blank">
                    <Icon src="/static/icons/linkedin.svg" />
                </a>
            </div>
            <Button as="a" href={company.careers} target="_blank">
                View Jobs
            </Button>
        </Card.Footer>
    </Card>
);

const Page = () => (
    <React.Fragment>
        <Header />
        <Grid>{COMPANIES.map((company) => createCard(company))}</Grid>
        <Footer />
    </React.Fragment>
);

export default Page;
