import styled from 'styled-components';

import Category from './Category';
import Footer from './Footer';
import Header from './Header';
import Image from './Image';
import Logo from './Logo';
import SocialLink from './SocialLink';
import Text from './Text';
import Title from './Title';

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

Card.Category = Category;
Card.Footer = Footer;
Card.Header = Header;
Card.Image = Image;
Card.Logo = Logo;
Card.SocialLink = SocialLink;
Card.Text = Text;
Card.Title = Title;

export default Card;
