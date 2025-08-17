import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   *,
   *::before,
   *::after {
      box-sizing: border-box;
   }

   @media (prefers-reduced-motion: no-preference) {
      :root {
         scroll-behavior: smooth;
      }
   }

   html {
      font-size: 16px;

      @media (min-width: ${(props) => props.theme.responsive.xl}) {
         & {
            font-size: 18px;
         }
      }
   }

    body {
      margin: 0;
      font-family: ${(props) => props.theme.font.family};
      font-size: ${(props) => props.theme.font.size};
      font-weight: ${(props) => props.theme.font.weight};
      line-height: ${(props) => props.theme.font.lineHeight};
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      color: ${(props) => props.theme.colors.color};
      background-color: ${(props) => props.theme.colors.bg};
    }

    h6,
   .h6,
   h5,
   .h5,
   h4,
   .h4,
   h3,
   .h3,
   h2,
   .h2,
   h1,
   .h1 {
      margin: 0;
      font-weight: 500;
   }

    input,
   button,
   select,
   optgroup,
   textarea {
      margin: 0;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
   }

   a {
      color: inherit;
      text-decoration: none;
      display: inline-block;
   }

   a:hover {
      text-decoration: underline;
   }

    button {
      background-color: transparent;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      border: none;
      outline: none;
      transition: 0.3s;

      &:hover {
         opacity: .75;
      }
    }

    button:disabled {
       opacity: 0.75;
       background-color: #444;
    }

    img {
       max-width: 100%;
       display: block;
    }

    hr {
       margin: 1rem 0;
    }
`;

export default GlobalStyles;
