import dynamic from 'next/dynamic';
import styled from 'styled-components';

import {COMPANIES} from '../companies';

const MapContainer = styled.div`
    display: flex;
    flex-direction: row;

    .leaflet-container {
        display: flex;
        width: 70vw;
        height: 100vh;
    }
`;

const CompanyContainer = styled.div`
    height: 100vh;
    width: 400px;
    overflow: scroll;
`;

const CompanyList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Company = styled.div`
    height: 70px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ececec;
`;

const CompanyName = styled.div`
    font-family: 'Circular Std';
    font-weight: 500;
    align-self: center;
    margin-left: 15px;
`;

const Distance = styled.div`
    font-family: 'Rubik';
    align-self: center;
    justify-self: flex-end;
`;

const CompanyLogo = styled.img`
    height: 70px;
    width: 70px;
`;

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false
});

const formatName = (name) => name.replace('_', ' ');

const formatFilePath = (name) => name.replace(' ', '_').toLowerCase();

const createCompanyItem = (index, company) => (
    <Company key={index}>
        <CompanyLogo alt={formatName(company.name)} src={`/static/logos/${formatFilePath(company.name)}.jpg`} />
        <CompanyName>{company.name}</CompanyName>
        {/* <Distance>{'1 mi'}</Distance> */}
    </Company>
);

export default () => (
    <MapContainer>
        <CompanyContainer>
            <CompanyList>{COMPANIES.map((company, index) => createCompanyItem(index, company))}</CompanyList>
        </CompanyContainer>
        <DynamicComponentWithNoSSR />
    </MapContainer>
);
