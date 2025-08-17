import styled from "styled-components";

const Row = styled.div`
   display: flex;
   row-gap: 0.5rem;
   flex-wrap: ${(props) => (props.wrap ? props.wrap : "wrap")};

   @media (min-width: ${(props) => props.theme.responsive.xsm}) {
      flex-wrap: ${(props) => props.wrapXsm && props.wrapXsm};
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      flex-wrap: ${(props) => props.wrapSm && props.wrapSm};
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      flex-wrap: ${(props) => props.wrapMd && props.wrapMd};
   }

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      flex-wrap: ${(props) => props.wrapLg && props.wrapLg};
   }

   @media (min-width: ${(props) => props.theme.responsive.xl}) {
      flex-wrap: ${(props) => props.wrapXl && props.wrapXl};
   }
`;

export default Row;
