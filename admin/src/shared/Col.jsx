import styled from "styled-components";

const getSpan = (span) => {
   if (!span) return;

   let wdth;

   switch (span) {
      case "1":
         wdth = "100%";
         break;

      case "2":
         wdth = "50%";
         break;

      case "3":
         wdth = "33.3333333333%";
         break;

      case "4":
         wdth = "25%";
         break;

      case "5":
         wdth = "20%";
         break;

      case "6":
         wdth = "16.6666666667%";
         break;

      case "auto":
         wdth = "auto";
         break;

      default:
         wdth = "100%";
         break;
   }

   return wdth;
};

const Col = styled.div`
   flex-shrink: 0;
   width: 100%;
   max-width: 100%;
   flex: 1 0 0%;
   padding: 0 0.125rem;
   flex: 0 0 auto;
   width: ${(props) => getSpan(props.span)};
   flex-grow: ${(props) => props.grow && props.grow};
   flex-shrink: ${(props) => props.grow && 1};
   overflow: hidden;

   @media (min-width: ${(props) => props.theme.responsive.xsm}) {
      width: ${(props) => props.xsm && getSpan(props.xsm)};
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      width: ${(props) => props.sm && getSpan(props.sm)};
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      width: ${(props) => props.md && getSpan(props.md)};
   }

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      width: ${(props) => props.lg && getSpan(props.lg)};
   }

   @media (min-width: ${(props) => props.theme.responsive.xl}) {
      width: ${(props) => props.xl && getSpan(props.xl)};
   }
`;

export default Col;
