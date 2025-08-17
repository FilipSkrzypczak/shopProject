// import { reversePalette } from "styled-theme/composer";

const theme = {};

theme.responsive = {
   xsm: "350px",
   sm: "550px",
   md: "768px",
   lg: "992px",
   xl: "1200px",
};

theme.colors = {
   color: "#132640",
   bg: "#eceff1",
   main: "#132640",
   second: "#191970",
};

theme.filled = `
   background-color: #fff;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
   z-index: 2;
`;

// theme.reverseColors = reversePalette(theme.colors);

theme.font = {
   size: "1rem",
   family: "Barlow",
   weight: 500,
   lineHeight: 1.2,
};

export default theme;
