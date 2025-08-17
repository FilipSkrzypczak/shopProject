import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const StyledSearch = styled.div`
   position: absolute;
   bottom: -50px;
   right: 0;
   width: 100%;
   padding-left: 4rem;

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      position: initial;
      padding: 0;
      margin-right: auto;
   }

   form {
      display: flex;
      border: 1px solid ${(props) => props.theme.colors.second};

      & > * {
         padding: 0.4rem 0.5rem;
      }

      input {
         width: 100%;
         outline: none;
         border: none;
         background-color: transparent;
      }

      button {
         border-left: 1px solid #000;
         background-color: ${(props) => props.theme.colors.second};
         color: #fafafa;
         padding-left: 1rem;
         padding-right: 1rem;
      }
   }
`;

const Search = () => {
   const [keyword, setKeyword] = useState();
   let navigate = useNavigate();

   const submitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
         navigate(`/search/${keyword}`);
      } else {
         navigate("/");
      }
   };

   return (
      <StyledSearch>
         <form onSubmit={submitHandler}>
            <input
               type="search"
               placeholder="Wyszukaj produkt..."
               onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">
               <i className="fa-solid fa-magnifying-glass"></i>
            </button>
         </form>
      </StyledSearch>
   );
};

export default Search;
