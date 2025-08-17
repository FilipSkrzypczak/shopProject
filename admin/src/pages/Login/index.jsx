import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Actions/UserActions";
import Button from "../../shared/Button";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledLogin = styled.div`
   display: flex;
   justify-content: center;

   form {
      margin-top: 3rem;
      padding: 1rem;
      ${(props) => props.theme.filled}
      width: 95%;
      max-width: 350px;

      @media (min-width: ${(props) => props.theme.responsive.sm}) {
         padding: 1rem 2rem 2rem;
      }

      border-top: 2px solid ${(props) => props.theme.colors.second};
      z-index: 0;

      p {
         margin-bottom: 2rem;
         font-weight: bolder;
      }

      label {
         display: block;
         margin-bottom: 1.5rem;
         position: relative;

         input:not([type="checkbox"]) {
            width: 100%;
            border: 1px solid ${(props) => props.theme.colors.main};
            padding: 0.5rem;
            outline: none;
         }

         span {
            display: block;
            font-size: small;
            position: absolute;
            opacity: 1;
            top: -10px;
            left: 5px;
            background-color: #fff;
            padding: 0 0.5rem;
            pointer-events: none;
            transition: all 0.3s;
         }
      }
   }
`;

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.user);
   const { error, loading, userInfo } = userLogin;

   useEffect(() => {
      userInfo && userInfo?.isAdmin && navigate("/");
   }, [userInfo, navigate]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
   };

   return (
      <>
         <StyledLogin>
            <form onSubmit={submitHandler}>
               {error && <Message context={error} variant="error" />}
               {loading && <Loading />}
               <p>Zaloguj</p>
               <label>
                  <input
                     type="email"
                     placeholder="E-mail"
                     value={email}
                     required
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <span>E-mail</span>
               </label>
               <label>
                  <input
                     type="password"
                     placeholder="Hasło"
                     value={password}
                     required
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <span>Hasło</span>
               </label>
               <Button type="submit">Zaloguj</Button>
            </form>
         </StyledLogin>
      </>
   );
};

export default Login;
