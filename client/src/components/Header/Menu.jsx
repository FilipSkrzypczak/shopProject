import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = styled.div`
   position: fixed;
   left: -100%;
   top: 0;
   bottom: 0;
   right: 0;
   width: 100vw;
   z-index: 999;
   transition: all 0.3s;

   ${(props) => props.active && activeMenu}

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      position: initial;
      width: auto;
   }

   ul {
      overflow: auto;
      list-style: none;
      background-color: #fff;
      height: 100%;
      max-width: 300px;
      width: 70%;
      position: absolute;
      left: -100%;
      top: 0;
      bottom: 0;
      z-index: 1001;
      transition: ${(props) => (props.active ? "all 0.3s 0.3s" : "all 0.3s")};
      left: ${(props) => props.active && "0"};
      margin: 0;
      padding: 0;

      @media (min-width: ${(props) => props.theme.responsive.lg}) {
         height: auto;
         max-width: unset;
         width: auto;
         position: initial;
         display: flex;
         border-top: 1px solid #ccc;

         li {
            flex: 1;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
         }
      }

      strong {
         color: ${(props) => props.theme.colors.second};
         width: 100%;
      }

      a {
         padding: 1rem 1.5rem 1rem 1rem;
         display: flex;
         justify-content: space-between;
         font-weight: 600;
         text-decoration: none !important;

         @media (min-width: ${(props) => props.theme.responsive.lg}) {
            padding: 1rem;
            text-align: center;
            display: block;
            width: 100%;

            i {
               display: none;
            }
         }

         i {
            margin-left: 1rem;
         }
      }

      h3 {
         font-weight: 600;
         padding: 0.5rem 1rem;
         font-size: 0.9rem;
         opacity: 0.8;
      }

      li {
         position: relative;
         &:before {
            content: "";
            opacity: 0;
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            bottom: 0;
            height: 2px;
            background-color: ${(props) => props.theme.colors.second};
            transition: all 0.3s;
         }

         &:hover {
            &:before {
               opacity: 1;
            }
         }

         & > div {
            padding: 1rem;
            background-color: #eee;
            border-bottom: 1px solid #ccc;
            font-size: 1.2rem;
            margin-bottom: 1rem;

            i {
               margin-right: 0.5rem;
            }
         }
      }

      li:last-child {
         border-top: 1px solid #ccc;
         a {
            display: block;
            width: 100%;
            i {
               margin-left: 0;
               margin-right: 0.5rem;
            }
         }

         @media (min-width: ${(props) => props.theme.responsive.sm}) {
            display: none;
         }
      }
   }
`;

const Bg = styled.div`
   position: absolute;
   z-index: 1000;
   background-color: #ffffff78;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   width: 100%;
   height: 100%;

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      display: none;
   }
`;

const Burger = styled.div`
   cursor: pointer;
   width: 30px;
   padding-top: 12px;
   padding-bottom: 12px;
   margin-right: 1rem;
   margin-bottom: 0.5rem;

   span {
      height: 3px;
      width: 100%;
      position: relative;
      display: block;
      transition: 0.3s;
      border-radius: 6px;
      background-color: ${(props) => props.theme.colors.main};
      font-size: 0;

      &::before,
      &:after {
         content: "";
         width: 100%;
         height: 100%;
         position: absolute;
         left: 0;
         right: 0;
         transition: 0.3s;
         border-radius: 6px;
         background-color: inherit;
      }

      &::before {
         bottom: -9px;
      }

      &:after {
         top: -9px;
      }
   }

   ${(props) => props.active && activeBurger}

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      display: none !important;
   }
`;

const StyledLi = styled.li`
   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      display: none !important;
   }
`;

const activeBurger = `
   span {
      transform: rotate(-45deg);

      &::before {
         transform: rotate(90deg);
         bottom: 0;
      }

      &:after {
         opacity: 0;
      }
   }
`;

const activeMenu = `
    left: 0;
`;

const hideScroll = () => {
   document.body.style.overflow = "hidden";
};

const showScroll = () => {
   document.body.style.overflow = "";
};

const Menu = ({ categories }) => {
   const [isActive, setIsActive] = useState(false);

   return (
      <>
         {isActive ? hideScroll() : showScroll()}
         <Navigation active={isActive}>
            <Bg onClick={() => setIsActive(false)} />
            <ul>
               <StyledLi>
                  <div onClick={() => setIsActive(false)}>
                     <i className="fa-solid fa-xmark"></i> <b>Menu</b>
                  </div>
               </StyledLi>
               <StyledLi>
                  <h3>Kategorie</h3>
               </StyledLi>
               {categories.map((c) => {
                  return (
                     <li key={c._id}>
                        <Link
                           to={`/products?${c.name}`}
                           onClick={() => {
                              setIsActive(false);
                           }}
                        >
                           {c.name} <i className="fa-solid fa-angle-right"></i>
                        </Link>
                     </li>
                  );
               })}
               <li>
                  <Link
                     to="/contact"
                     onClick={() => {
                        setIsActive(false);
                     }}
                  >
                     <i className="fa-solid fa-phone"></i> Kontakt
                  </Link>
               </li>
            </ul>
         </Navigation>
         <Burger active={isActive} onClick={() => setIsActive(!isActive)}>
            <span>Menu</span>
         </Burger>
      </>
   );
};

export default Menu;
