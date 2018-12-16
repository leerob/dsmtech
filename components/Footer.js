import styled from 'styled-components';

const Text = styled.div`
    font-family: 'Rubik';
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    padding: 30px 10px;
    text-align: center;
`;

const Footer = () => (
    <Text>
        {'Created by '}
        <a href="https://www.leejamesrobinson.com/" target="_blank">
            {'Lee Robinson'}
        </a>
    </Text>
);

export default Footer;
