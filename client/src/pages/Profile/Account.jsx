import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateUserProfile } from "../../Redux/Actions/UserActions";
import Button from "../../shared/Button";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";

const StyledAccount = styled.div`
   max-width: 350px;
   p {
      margin: 0;
      font-weight: 600;
      margin-bottom: 1rem;
   }

   form {
      label {
         display: block;
         margin-bottom: 1.5rem;
         position: relative;

         a {
            color: #ec0000;
         }

         input[type="checkbox"] {
            margin-right: 0.5rem;
         }

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

const Account = ({ user }) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [success, setSuccess] = useState(false);

   const dispatch = useDispatch();

   const userUpdateProfile = useSelector((state) => state.user);
   const { error, loading, userInfo } = userUpdateProfile;

   useEffect(() => {
      if (user) {
         setName(user.name);
         setEmail(user.email);
      }
   }, [user]);

   const submitHandler = (e) => {
      e.preventDefault();
      // Password match
      if (password !== confirmPassword) {
      } else {
         dispatch(updateUserProfile({ name, email, password })).then(
            (response) => {
               if (response) {
                  setSuccess(true);
                  setTimeout(() => {
                     setSuccess(false);
                  }, 3000);
               }
            }
         );
      }
   };

   return (
      <StyledAccount>
         {success && (
            <Message
               isFixed={true}
               variant="success"
               context="Profil zapisany"
            />
         )}
         {loading && <Loading />}
         {error && <Message variant="error" context={error} />}
         <p>Dane konta:</p>
         <form onSubmit={submitHandler}>
            <label>
               <input
                  type="text"
                  name="name"
                  placeholder="Imię i Nazwisko"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <span>Imię i nazwisko</span>
            </label>
            <label>
               <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <span>E-mail</span>
            </label>
            <label>
               <input
                  type="password"
                  name="password"
                  placeholder="Nowe hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <span>Nowe hasło</span>
            </label>
            <label>
               <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Powtórz hasło"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
               <span>Powtórz hasło</span>
            </label>
            <Button disabled={loading}>Zapisz profil</Button>
         </form>
      </StyledAccount>
   );
};

export default Account;
