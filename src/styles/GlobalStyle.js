import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212; // A dark background color
    color: #FFFFFF; // White text color
    font-family: 'Helvetica Neue', Arial, sans-serif; // A modern, bold-friendly font
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;