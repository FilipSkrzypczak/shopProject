import styled from "styled-components";

const Content = styled.div`
   padding: 1rem;
   ${(props) => props.theme.filled}

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      padding: 1.5rem;
   }
`;

export default Content;
