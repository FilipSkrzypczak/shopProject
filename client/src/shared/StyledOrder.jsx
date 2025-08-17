import styled from "styled-components";

const StyledOrder = styled.div`
   border: 1px solid #aaa;
   display: inline-block;
   padding: 1rem 0.75rem;
   transition: 0.3s all;
   border-radius: 3px;
   cursor: pointer;
   margin-bottom: 1rem;
   max-width: 330px;
   width: 100%;

   &:nth-of-type(odd) {
      margin-right: 1rem;
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      padding: 1rem;
   }

   &:hover {
      border: 1px solid #222;
   }

   div {
      position: relative;
      border: 1px solid #ccc;
      margin-bottom: 0.75rem;
      padding: 0.8rem 0.5rem 0.5rem;
      width: 100%;

      &:last-of-type {
         margin-bottom: 0;
      }

      span {
         position: absolute;
         top: -0.4rem;
         left: 0.25rem;
         font-size: smaller;
         background-color: #fff;
         padding: 0 0.25rem;
      }
   }

   & > button {
      padding: 0;
      margin: 0.75rem 0 0;
      font-weight: 600;
      color: ${(props) => props.theme.colors.second};
   }
`;

export default StyledOrder;
