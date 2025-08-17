import React from "react";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";
import RegisterForm from "./RegisterForm";
import StyledForm from "../../shared/StyledForm";

const Login = () => {
   return (
      <Section>
         <Wrapper>
            <StyledForm>
               <RegisterForm />
            </StyledForm>
         </Wrapper>
      </Section>
   );
};

export default Login;
