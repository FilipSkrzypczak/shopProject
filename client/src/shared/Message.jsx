import React from "react";
import styled from "styled-components";

const getVariant = (v) => {
   let variant = {};

   switch (v) {
      case "error":
         variant.color = "#ff5252";
         variant.bg = "#ffbaba";
         break;

      case "success":
         variant.color = "#228b22";
         variant.bg = "#a8e4a0";
         break;

      case "info":
         variant.color = "#7a6f59";
         variant.bg = "#f5deb3";
         variant.link = "#312c23";
         variant.align = "left";
         break;

      default:
         variant.color = "blue";
         variant.bg = "lightblue";
         break;
   }

   return variant;
};

const fixedPositionStyles = {
   position: "fixed",
   top: "1rem",
   left: "50%",
   transform: "translateX(-50%)",
   zIndex: "10",
   minWidth: "500px",
   animation: "showMessage 2s both",
};

const StyledMessage = styled.div`
   padding: 1rem;
   text-align: center;
   margin-bottom: 1rem;
   color: ${(props) => getVariant(props.variant).color};
   background-color: ${(props) => getVariant(props.variant).bg};
   text-align: ${(props) => getVariant(props.variant).align};

   ${(props) => props.fixedPosition && fixedPositionStyles};

   a {
      color: ${(props) => getVariant(props.variant).link};
   }

   @keyframes showMessage {
      from {
         opacity: 0;
         top: 0;
      }

      25% {
         opacity: 1;
         top: 1rem;
      }

      50% {
         opacity: 1;
         top: 1rem;
      }

      75% {
         opacity: 0;
         top: 0;
      }

      to {
         opacity: 0;
         top: 0;
      }
   }
`;

const Message = ({ variant, context, isFixed }) => {
   return (
      <StyledMessage fixedPosition={isFixed} variant={variant}>
         {context}
      </StyledMessage>
   );
};

export default Message;
