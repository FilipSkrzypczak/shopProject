import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../Redux/Actions/UserActions";

const StyledAccount = styled.div`
   cursor: pointer;
   position: relative;
   margin-right: 2rem;
   text-align: center;

   div {
      position: absolute;
      right: 0;
      border: 1px solid #ccc;
      background-color: #fff;
      top: 37px;
      padding: 0 0 0.5rem;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s;
      min-width: 150px;
      z-index: 2;
      text-align: center;

      @media (min-width: ${(props) => props.theme.responsive.xl}) {
         top: 40px;
      }

      span {
         display: block;
         border-bottom: 1px solid #ccc;
         padding: 0.5rem 0;
         background-color: #eee;
      }

      a {
         padding: 0.5rem 1rem;
         width: 100%;

         &:hover {
            background-color: #eee;
         }
      }

      &:hover {
         opacity: 1;
         pointer-events: all;
      }
   }

   &:hover div {
      opacity: 1;
      pointer-events: all;
   }
`;

const Account = () => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
   const { userInfo } = user;

   const logoutHandler = () => {
      dispatch(logout());
   };

   return (
      <StyledAccount>
         <i className="fa-solid fa-user"></i>
         <div>
            {userInfo ? (
               <>
                  <span>{userInfo.name}</span>
                  <Link to="/profile">Profil</Link>
                  <Link to="#" onClick={logoutHandler}>
                     Wyloguj
                  </Link>
               </>
            ) : (
               <>
                  <Link to="/register">Załóż konto</Link>
                  <Link to="/login">Zaloguj</Link>
               </>
            )}
         </div>
         <small>Konto</small>
      </StyledAccount>
   );
};

export default Account;
