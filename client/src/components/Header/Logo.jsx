import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.h1`
   font-size: 1.8rem;
   font-family: "Kanit";
   color: ${(props) => props.theme.colors.second};
   position: relative;
   display: inline-block;
   margin-right: auto;
   font-weight: 500;

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      margin-right: 2rem;
   }

   a {
      &:before {
         content: "";
         width: 50%;
         height: 3px;
         bottom: 3px;
         right: 0;
         display: block;
         position: absolute;
         background-color: ${(props) => props.theme.colors.second};
         transition: all 0.3s;
      }

      &:after {
         content: "";
         width: 5px;
         height: 5px;
         bottom: 2px;
         right: -2.5px;
         display: block;
         position: absolute;
         background-color: ${(props) => props.theme.colors.second};
         border-radius: 50%;
      }

      &:hover {
         text-decoration: none;

         &:before {
            width: 100%;
         }
      }
   }
`;

const Logo = () => {
   return (
      <StyledLogo>
         <Link to="/">XYZStore</Link>
      </StyledLogo>
   );
};

export default Logo;
