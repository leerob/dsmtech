import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #f9f9f9;
  }

  text-rendering: optimizeLegibility;

  @font-face {
    font-family: "Circular Std";
    font-display: auto;
    src: url("/fonts/CircularStd-Bold.otf");
  }

  @font-face {
    font-family: "Rubik";
    font-display: auto;
    src: url("/fonts/Rubik-Light.ttf");
  }
`;

export const formatName = (name) => name.replace('and', '&');

export const formatFilePath = (name) => name.replace(/ /g, '_').toLowerCase();
