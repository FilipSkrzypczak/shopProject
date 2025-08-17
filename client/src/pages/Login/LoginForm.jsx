import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../Redux/Actions/UserActions";
import Button from "../../shared/Button";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";

const LoginForm = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.user);
   const { error, loading } = userLogin;

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
   };

   return (
      <>
         {error && <Message context={error} variant="error" />}
         {loading && <Loading />}
         <h2>Zaloguj się</h2>
         <form onSubmit={submitHandler}>
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
            <Button type="submit" disabled={loading}>
               Zaloguj się
            </Button>
            <div>
               Nie masz konta?{" "}
               <Link to="/register">
                  <b>Zarejestruj się</b>
               </Link>
            </div>
         </form>
      </>
   );
};

export default LoginForm;
