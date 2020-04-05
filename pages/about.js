import React from 'react';
import styled from 'styled-components';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBar';

const AboutContainer = styled.div`
  padding-top: 80px;
  font-family: 'Rubik';
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  flex: 1;
  margin: 0 auto;
  max-width: 690px;
  width: 100%;

  @media (min-width: 690px) {
    padding-top: 120px;
  }
`;

const About = styled.main`
  background-color: white;
  border-radius: 5px;
  padding: 24px;
  box-shadow: 2px 2px 4px 0px #cfd8dc;

  p {
    margin-bottom: 34px;
  }

  @media (min-width: 500px) {
    padding: 30px 75px;
  }
`;

const StyledLink = styled.a`
  color: #184a89;
  text-decoration: none;
  transition: all 0.15s ease;

  :hover {
    text-decoration: underline;
    transition: all 0.15s ease;
  }
`;

const InnovationIowa = styled.img`
  margin: 0 auto;
  max-width: 200px;
  display: flex;

  @media (min-width: 737px) {
    margin: 0 auto;
  }
`;

const ProgrammerSvg = styled.img`
  max-width: 400px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const Page = () => (
  <>
    <NavBar />
    <AboutContainer>
      <About>
        <ProgrammerSvg src="/programmer.svg" />
        <p>
          {`
                    When Lee Robinson set out to find a new job as a developer in the Des Moines area,
                    he started to research companies and create pros/cons lists. During this process,
                    he realized there wasn't a central hub listing out all the tech companies and jobs
                    in the greater DSM area and saw others asking for the same thing.`}
        </p>
        <p>
          {`
                    He decided to create dsmtech.io - the easiest way to find tech companies and jobs in the Des Moines
                    area. With humble beginnings, it started as a small list of 15 public, private, and startups in the area.
                    Since then, it's tripled it's company list and helped people across the state of Iowa land tech jobs.`}
        </p>
        <p>
          {`
                    If you have any ideas on how to make this better, please let me know.
                    Also, if you see any information that is incorrect or know of any companies 
                    that are missing, `}
          <StyledLink href="https://github.com/leerob/dsmtech">
            {'create an issue or open a pull request here.'}
          </StyledLink>
        </p>
        <a href="https://innovationia.com/2019/01/03/dsmtech-io-launches-for-tech-job-seekers-scouting-des-moines/">
          <InnovationIowa src="/innovation-iowa.png" />
        </a>
      </About>
    </AboutContainer>
    <Footer />
  </>
);

export default Page;
