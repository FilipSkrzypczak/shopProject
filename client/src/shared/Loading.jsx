import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
   width: 100px;
   height: 100px;
   margin: 2rem auto 4rem;
   background-image: url("/images/loading.png");
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center center;
   animation: rotate 1s infinite;

   @keyframes rotate {
      from {
         transform: rotate(0deg);
      }

      to {
         transform: rotate(360deg);
      }
   }
`;

const Loading = () => {
   return <StyledLoading />;
};

export default Loading;
