import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  text-rendering: optimizeLegibility;

  @font-face {
    font-family: "Circular Std";
    font-display: auto;
    src: url("/static/fonts/CircularStd-Bold.otf");
  }

  @font-face {
    font-family: "Rubik";
    font-display: auto;
    src: url("/static/fonts/Rubik-Light.ttf");
  }
`;

export const formatName = (name) => name.replace('and', '&');

export const formatFilePath = (name) => name.replace(/ /g, '_').toLowerCase();
