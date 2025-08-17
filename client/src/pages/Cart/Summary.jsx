import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../shared/Button";

const StyledSummary = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem;
   border-top: 2px solid ${(props) => props.theme.colors.second};

   button {
      margin-right: 1rem;
      margin-bottom: 1rem;
      font-weight: 500;
   }
`;

const Total = styled.div`
   margin-bottom: 1.5rem;
   padding-bottom: 1rem;
   font-size: 1.4rem;
   /* text-align: right; */
   font-weight: 600;
   border-bottom: 1px solid #ccc;
   display: flex;
   flex-wrap: wrap;

   small {
      opacity: 0.8;
      font-size: medium;
      margin-right: auto;
   }

   span {
      text-align: right;
      font-size: small;
      opacity: 0.5;
      margin-left: 0.5rem;
      width: 100%;
   }
`;

const Summary = ({ cartItems, total }) => {
   const navigate = useNavigate();

   const checkOutHandler = () => {
      navigate("/checkout");
   };

   return (
      <StyledSummary>
         <Total>
            <small>Do zapłaty:</small>
            {total} zł
            <span>+ dostawa</span>
         </Total>
         <div>
            {total > 0 && (
               <Button onClick={checkOutHandler}>Dostawa i płatność</Button>
            )}
            <button onClick={() => navigate(-1)}>Kontynuuj zakupy</button>
         </div>
      </StyledSummary>
   );
};

export default Summary;
