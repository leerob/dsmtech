import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }

    text-rendering: optimizeLegibility;

    @font-face {
        font-family: "Circular Std";
        src: url("/static/fonts/CircularStd-Bold.otf");
    }

    @font-face {
        font-family: "Rubik";
        src: url("/static/fonts/Rubik-Light.ttf");
    }
`;

export default GlobalStyle;
