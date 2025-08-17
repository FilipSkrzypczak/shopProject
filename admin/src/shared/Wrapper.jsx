import styled from "styled-components";

const Wrapper = styled.div`
   width: 100%;
   padding-right: ${(props) => (props.gx ? props.gx : "0.75rem")};
   padding-left: ${(props) => (props.gx ? props.gx : "0.75rem")};
   margin-right: auto;
   margin-left: auto;

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      & {
         max-width: 540px;
      }
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      & {
         max-width: 720px;
      }
   }

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      & {
         max-width: 960px;
      }
   }

   @media (min-width: ${(props) => props.theme.responsive.xl}) {
      & {
         max-width: 1140px;
      }
   }
`;

export default Wrapper;
