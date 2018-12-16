import styled from 'styled-components';

import Header from './Header';
import Category from './Category';
import Image from './Image';
import Text from './Text';
import Title from './Title';
import Footer from './Footer';
import Logo from './Logo';

const Card = styled.div`
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #e4e4e4;
    box-shadow: 2px 2px 4px 0px #cfd8dc;
    display: flex;
    flex-direction: column;
    margin: 10px;
    max-width: 300px;
    overflow: hidden;
    transition: all 0.15s ease;

    :hover {
        box-shadow: 0 10px 20px rgba(220, 220, 220, 0.5);
        transform: translateY(-4px);
    }
`;

Card.Header = Header;
Card.Category = Category;
Card.Image = Image;
Card.Text = Text;
Card.Title = Title;
Card.Footer = Footer;
Card.Logo = Logo;

export default Card;
