import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../shared/Button";
import Section from "../shared/Section";
import Wrapper from "../shared/Wrapper";

const StyledDiv = styled.div`
   ${(props) => props.theme.filled}
   padding:2rem 1rem;

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      padding: 2rem;
   }

   h2 {
      margin-bottom: 1rem;
   }

   h3 {
      margin-bottom: 2rem;
      opacity: 0.85;
   }

   button {
      margin-top: 2rem;
      margin-right: 2rem;
   }
`;

const NotFound = () => {
   return (
      <Section>
         <Wrapper>
            <StyledDiv>
               <h2>404 - Nie znaleziono strony</h2>
               <h3>
                  W tej lokalizacji nie zostało nic znalezione. <br /> Spróbuj
                  skorzystać z wyszukiwarki lub przejrzyj popularne pozycje.
               </h3>
               <img src="/images/not-found.png" alt="Not-found" />
               <Link to="/">
                  <Button>Strona główna</Button>
               </Link>
               <Link to="/products">
                  <Button>Produkty</Button>
               </Link>
            </StyledDiv>
         </Wrapper>
      </Section>
   );
};

export default NotFound;
