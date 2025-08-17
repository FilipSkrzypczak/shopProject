import React from "react";
import styled from "styled-components";

const StyledRating = styled.div`
   font-size: ${(props) => (props.size ? props.size : "85%")};
   cursor: ${(props) => props.target && "pointer"};
   i {
      color: #ffbf00;
   }

   span {
      margin-left: 0.5rem;
   }
`;

const Rating = ({ value, text, size, target }) => {
   return (
      <StyledRating
         size={size}
         onClick={() =>
            target && document.querySelector(`#${target}`).scrollIntoView()
         }
         target={target}
      >
         <i className={value >= 1 ? "fas fa-star" : "far fa-star"}></i>
         <i className={value >= 2 ? "fas fa-star" : "far fa-star"}></i>
         <i className={value >= 3 ? "fas fa-star" : "far fa-star"}></i>
         <i className={value >= 4 ? "fas fa-star" : "far fa-star"}></i>
         <i className={value >= 5 ? "fas fa-star" : "far fa-star"}></i>

         <span>{text && text}</span>
      </StyledRating>
   );
};

export default Rating;
