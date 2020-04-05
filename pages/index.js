import React from 'react';

import { formatName, formatFilePath } from '../components/utils';
import Button from '../components/Button.js';
import Card from '../components/Card';
import Grid from '../components/Grid.js';
import Footer from '../components/Footer.js';
import * as gtag from '../lib/gtag';

import { COMPANIES } from '../companies';
import NavBar from '../components/NavBar';

const createCard = (company) => (
  <Card key={company.name}>
    <Card.Header>
      <Card.Image
        alt={formatName(company.name)}
        src={`/imgs/${formatFilePath(company.name)}.jpg`}
      />
      <Card.Logo
        alt={formatName(company.name)}
        src={`/logos/${formatFilePath(company.name)}.jpg`}
      />
      <Card.Category>{company.category}</Card.Category>
      <Card.Title>{formatName(company.name)}</Card.Title>
    </Card.Header>
    <Card.Text>{company.description}</Card.Text>
    <Card.Footer>
      <div>
        <Card.SocialLink
          name={company.name}
          type="instagram"
          url={company.instagram}
        />
        <Card.SocialLink
          name={company.name}
          type="twitter"
          url={company.twitter}
        />
        <Card.SocialLink
          name={company.name}
          type="facebook"
          url={company.facebook}
        />
        <Card.SocialLink
          name={company.name}
          type="linkedin"
          url={company.linkedin}
        />
      </div>
      <Button
        as="a"
        href={company.careers}
        target="_blank"
        onClick={() =>
          gtag.event({
            action: 'Careers Link',
            label: company.name
          })
        }
      >
        {'View Jobs'}
      </Button>
    </Card.Footer>
  </Card>
);

const Page = () => (
  <>
    <NavBar />
    <Grid>{COMPANIES.map((company) => createCard(company))}</Grid>
    <Footer />
  </>
);

export default Page;
