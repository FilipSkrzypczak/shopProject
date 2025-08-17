import React from "react";
import styled from "styled-components";

const getColors = (type) => {
   if (type === "oczekiwanie na płatność") {
      return {
         backgroundColor: "#7171f1",
         color: "#fff",
      };
   }

   if (type === "złożone") {
      return {
         backgroundColor: "#F8DE7E",
         color: "#7c6e35",
      };
   }

   if (type === "wysłane") {
      return {
         backgroundColor: "royalblue",
         color: "#fff",
      };
   }

   if (type === "dostarczone") {
      return {
         backgroundColor: "#50C878",
         color: "#fff",
      };
   }

   if (type === "anulowane") {
      return {
         backgroundColor: "#CD5C5C",
         color: "#fff",
      };
   }
};

const StyledStatus = styled.button`
   ${(props) => getColors(props.type)}
   text-transform: capitalize;
   cursor: pointer;
   font-size: 0.8rem;

   font-weight: 600;
   padding: 0.5rem 1rem;
`;

const Status = ({ context, title }) => {
   return (
      <StyledStatus type={context} title={title}>
         {context}
      </StyledStatus>
   );
};

export default Status;
