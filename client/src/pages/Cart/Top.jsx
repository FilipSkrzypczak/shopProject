import React from "react";
import styled from "styled-components";

const StyledTop = styled.h2`
   margin: 0 0.25rem 1.5rem;
   font-size: 1.2rem;
`;

const Top = ({ count }) => {
   return <StyledTop>Produkty w koszyku ({count})</StyledTop>;
};

export default Top;
