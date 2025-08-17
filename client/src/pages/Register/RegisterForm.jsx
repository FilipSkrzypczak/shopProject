import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../Redux/Actions/UserActions";
import Button from "../../shared/Button";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";

const RegisterForm = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [isCompany, setIsCompany] = useState(false);
   const [acceptRegulations, setAcceptRegulations] = useState(false);
   const [password, setPassword] = useState("");

   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.user);
   const { error, loading } = userRegister;

   const submitHandler = (e) => {
      e.preventDefault();
      const data = { name, email, password, isCompany, acceptRegulations };
      dispatch(register(data));
   };

   return (
      <>
         {error && <Message context={error} variant="error" />}
         {loading && <Loading />}
         <h2>Załóż konto</h2>
         <form onSubmit={submitHandler}>
            <label>
               <input
                  type="text"
                  placeholder="Imię i nazwisko"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
               />
               <span>Imię i nazwisko</span>
            </label>
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
            <label>
               <input
                  type="checkbox"
                  checked={isCompany}
                  onChange={(e) => setIsCompany(e.target.checked)}
               />
               Konto firmowe
            </label>
            <label>
               <input
                  type="checkbox"
                  checked={acceptRegulations}
                  required
                  onChange={(e) => setAcceptRegulations(e.target.checked)}
               />
               Akceptuję{" "}
               <Link to="/policy" target={"_blank"}>
                  regulamin
               </Link>{" "}
               sklepu
            </label>
            <Button type="submit" disabled={loading}>
               Załóż konto
            </Button>
            <div>
               Masz konta?{" "}
               <Link to="/login">
                  <b>Zaloguj się</b>
               </Link>
            </div>
         </form>
      </>
   );
};

export default RegisterForm;
