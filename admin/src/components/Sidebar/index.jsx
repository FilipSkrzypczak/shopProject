import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.div`
   padding: 1rem 0.5rem;
   ${(props) => props.theme.filled};
   min-width: 70px;

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      padding: 1rem;
   }

   h3 {
      margin: 0 0 0.5rem;
      opacity: 0.8;
      font-weight: 600;
      font-size: 1rem;
   }

   ul {
      padding: 0;
      margin: 0;
      list-style: none;
   }
`;

const Item = styled.li`
   overflow: hidden;
   cursor: pointer;
   margin-bottom: 0.5rem;
   border-radius: 4px;
   background-color: ${(props) => props.isActive && props.theme.colors.second};
   color: ${(props) => props.isActive && "#fff"};

   &:hover {
      background-color: ${(props) => props.theme.colors.second};
      color: #fff;

      a {
         background-color: ${(props) => props.theme.colors.second};
         color: #fff;
      }
   }

   a {
      display: flex;
      align-items: center;
      text-decoration: none !important;
      padding: 0.5rem;
   }

   i {
      font-size: 1.5rem;
   }

   span {
      display: none;
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      i {
         min-width: 40px;
         margin-right: 0.5rem;
      }

      span {
         display: block;
      }
   }
`;

const Sidebar = () => {
   const location = useLocation();
   return (
      <StyledSidebar>
         <h3>Panel</h3>
         <ul>
            <Item isActive={location.pathname === "/"}>
               <Link to="/">
                  <i className="fa-solid fa-house"></i> <span>Kokpit</span>
               </Link>
            </Item>
            <Item isActive={location.pathname === "/analitics"}>
               <Link to="/analitics">
                  <i className="fa-solid fa-chart-column"></i>
                  <span>Analityka</span>
               </Link>
            </Item>
            <Item isActive={location.pathname === "/users"}>
               <Link to="/users">
                  <i className="fa-solid fa-user"></i> <span>Klienci</span>
               </Link>
            </Item>
            <Item isActive={location.pathname === "/products"}>
               <Link to="/products">
                  <i className="fa-solid fa-shop"></i> <span>Produkty</span>
               </Link>
            </Item>
            <Item isActive={location.pathname === "/categories"}>
               <Link to="/categories">
                  <i className="fa-solid fa-list"></i> <span>Kategorie</span>
               </Link>
            </Item>
            <Item isActive={location.pathname === "/orders"}>
               <Link to="/orders">
                  <i className="fa-solid fa-box-open"></i>
                  <span>Zamówienia</span>
               </Link>
            </Item>
         </ul>
         <hr />
         <ul>
            <Item isActive={location.pathname === "/reviews"}>
               <Link to="/reviews">
                  <i className="fa-solid fa-comments"></i> <span>Opinie</span>
               </Link>
            </Item>
            <Item isActive={location.pathname === "/notyfications"}>
               <Link to="/notyfications">
                  <i className="fa-solid fa-bell"></i>
                  <span>Notyfikacje</span>
               </Link>
            </Item>
         </ul>
         <hr />
      </StyledSidebar>
   );
};

export default Sidebar;
