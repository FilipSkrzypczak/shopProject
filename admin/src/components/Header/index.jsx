import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../Redux/Actions/UserActions";

const StyledHeader = styled.header`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0.8rem 1rem;
   position: sticky;
   top: 0;
   z-index: 999;
   ${(props) => props.theme.filled};
   margin-bottom: 0.25rem;
`;

const Logo = styled.h1`
   font-size: 2rem;
   font-weight: bold;
   color: ${(props) => props.theme.colors.second};
   cursor: pointer;

   span {
      font-size: 50%;
      display: block;

      @media (min-width: ${(props) => props.theme.responsive.xsm}) {
         display: inline-block;
      }
   }

   &:hover {
      text-decoration: underline;
   }
`;

const Right = styled.div`
   display: flex;
   align-items: center;
   & > div {
      margin-right: 1rem;
      position: relative;
      font-size: 1.3rem;
      cursor: pointer;
      transition: 0.3s all;

      @media (min-width: ${(props) => props.theme.responsive.md}) {
         font-size: 1.5rem;
         margin-right: 1.5rem;
      }

      &:hover {
         transform: translateY(-3px);
      }

      span {
         position: absolute;
         top: -10px;
         right: -10px;
         font-size: 10px;
         border-radius: 50%;
         background-color: ${(props) => props.theme.colors.second};
         color: #fff;
         width: 18px;
         height: 18px;
         line-height: 18px;
         text-align: center;
      }
   }

   & > button {
      font-weight: bold;

      span {
         display: none;
      }

      @media (min-width: ${(props) => props.theme.responsive.sm}) {
         span {
            display: inline-block;
         }
      }

      i {
         margin-left: 0.2rem;
      }
   }
`;

const Header = () => {
   const dispatch = useDispatch();

   return (
      <StyledHeader>
         <Logo onClick={() => (window.location.href = "//localhost:3000")}>
            XYZStore <span>admin</span>
         </Logo>
         <Right>
            <div>
               <Link to="/notyfications">
                  <i className="fa-solid fa-bell"></i>
                  <span>1</span>
               </Link>
            </div>
            <button
               onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
               }}
            >
               <span>Wyloguj</span>{" "}
               <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
         </Right>
      </StyledHeader>
   );
};

export default Header;
