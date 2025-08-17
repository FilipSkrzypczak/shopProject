import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledContact = styled.div`
   cursor: pointer;
   text-align: center;
   margin-right: 2rem;
   display: none;

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      display: block;
      margin-left: 3rem;
   }
`;

const Contact = () => {
   return (
      <StyledContact>
         <Link to="/contact">
            <i className="fa-solid fa-phone"></i>
            <small>Kontakt</small>
         </Link>
      </StyledContact>
   );
};

export default Contact;
