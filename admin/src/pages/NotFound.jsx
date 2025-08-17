import React from "react";
import Content from "../shared/Content";
import styled from "styled-components";
import Button from "../shared/Button";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
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
      <Content>
         <StyledDiv>
            <h2>404 - Nie znaleziono strony</h2>
            <h3>W tej lokalizacji nie zostało nic znalezione.</h3>
            <img src="/images/not-found.png" alt="Not-found" />
            <Link to="/">
               <Button>Strona główna</Button>
            </Link>
         </StyledDiv>
      </Content>
   );
};

export default NotFound;
