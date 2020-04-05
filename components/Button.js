import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border-radius: 4px;
  border: 1px solid white;
  color: #0524d2;
  cursor: pointer;
  font-family: 'Rubik';
  font-size: 0.8rem;
  letter-spacing: 1px;
  padding: 5px 15px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease;

  :hover {
    border: 1px solid #0524d2;
  }
`;

export default Button;
