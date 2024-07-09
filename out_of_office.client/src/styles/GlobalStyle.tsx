import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box ;
    margin: 0;
    padding: 0;
}

li{
    list-style: none ;
}

h1, h2 {
    font-weight: 700 ;
}

h1{
    font-size: ${theme.fontSizes.h1} ;
}

h2{
    font-size:  ${theme.fontSizes.h2} ;
}

h3{
    font-size: ${theme.fontSizes.h3} ;
}

a{
    text-decoration: none ;
    cursor: pointer;
    color: ${theme.colors.black}
}

button {
    cursor: pointer;
}

body {
    font-size: ${theme.fontSizes.textSmall};
    font-family: ${theme.defaultFontFamily} ;
    color: ${theme.colors.black};
}

#root{
    display: flex ;
    flex-direction: column ;
    min-height: 100vh;
}

`;

export default GlobalStyle;
