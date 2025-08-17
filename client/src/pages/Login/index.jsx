import React from "react";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";
import LoginForm from "./LoginForm";
import StyledForm from "../../shared/StyledForm";

const Login = () => {
   return (
      <Section>
         <Wrapper>
            <StyledForm>
               <LoginForm />
            </StyledForm>
         </Wrapper>
      </Section>
   );
};

export default Login;
