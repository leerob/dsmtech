import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: center;
  padding-bottom: 50px;
  padding-top: 120px;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, auto);
  }

  @media only screen and (max-width: 660px) {
    grid-template-columns: auto;
  }
`;

export default Grid;
