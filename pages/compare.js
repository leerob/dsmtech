import React from 'react';
import styled, {css} from 'styled-components';

const Table = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-family: 'Rubik';
    margin: 0 auto;
    max-width: 1100px;
    padding: 2rem 0rem 0rem 0rem;
`;

const TableCell = styled.div`
    box-sizing: border-box;
    flex-grow: 1;
    font-family: 'Rubik';
    font-weight: 300;
    list-style-type: none;
    margin-left: 1px;
    margin-top: 1px;
    outline: 1px solid #ddd;
    overflow: hidden;
    padding: 0.8em 1.2em;
    text-align: center;
    width: 100%;
    width: calc(33.33% - 1px);
    transition: all 0.15s ease;
    min-height: 50px;

    :first-child {
        outline: 1px solid #fff;
        background: transparent;
        @media only screen and (max-width: 768px) {
            display: none;
        }
    }

    :hover {
        background: #f9f9f9;
    }

    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.25;
        `};
`;

const Company = styled.h3`
    font-size: 26px;
    margin: {
        top: 0;
        bottom: 3rem;
    }
    font-family: 'Circular Std';
`;

const CategoryCell = styled(TableCell)`
    text-align: left;
    font-size: 18px;
    font-style: italic;

    @media only screen and (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
`;

const CheckmarkIcon = () => <img src="/icons/check.svg" />;

const TableColumn = (props) => {
    const isDisabled = !props.hasFirst && !props.hasSecond;

    return (
        <React.Fragment>
            <CategoryCell disabled={isDisabled}>{props.title}</CategoryCell>
            <TableCell disabled={isDisabled}>{props.hasFirst && <CheckmarkIcon />}</TableCell>
            <TableCell disabled={isDisabled}>{props.hasSecond && <CheckmarkIcon />}</TableCell>
        </React.Fragment>
    );
};

const Header = () => (
    <React.Fragment>
        <TableCell />
        <TableCell>
            <Company>Workiva</Company>
        </TableCell>
        <TableCell>
            <Company>Dwolla</Company>
        </TableCell>
    </React.Fragment>
);

export default () => (
    <Table>
        <Header />
        <TableColumn title={'Medical'} hasFirst={true} hasSecond={true} />
        <TableColumn title={'Dental'} hasFirst={true} hasSecond={true} />
        <TableColumn title={'Vision'} hasFirst={true} hasSecond={true} />
        <TableColumn title={'401K'} hasFirst={false} hasSecond={true} />
        <TableColumn title={'401K Match'} hasFirst={false} hasSecond={true} />
        <TableColumn title={'Equity'} hasFirst={false} hasSecond={true} />
        <TableColumn title={'ESPP'} hasFirst={false} hasSecond={true} />
        <TableColumn title={'Annual Bonus'} hasFirst={false} hasSecond={true} />
        <TableColumn title={'Profit Sharing'} hasFirst={false} hasSecond={false} />
        <TableColumn title={'Commuter Assistance'} hasFirst={false} hasSecond={true} />
    </Table>
);
