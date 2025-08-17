import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";

const StyledDiv = styled.div`
   ${(props) => props.theme.filled}
   padding:1rem 2rem;

   hr {
      margin: 1rem 0;
   }

   h2 {
      font-size: 1.2rem;
   }

   i {
      margin-right: 0.5rem;
   }
`;

const Contact = () => {
   return (
      <Section>
         <Wrapper>
            <StyledDiv>
               <h2>Kontakt</h2>
               <hr />
               <div>
                  {/* <div>
                     <i class="fa-solid fa-phone"></i> 515 747 829
                  </div>
                  <br />
                  <div>
                     <i class="fa-solid fa-envelope"></i>
                     <a href="mailto:sklep@bf.pl">sklep@bf.pl</a>
                  </div> */}
               </div>
            </StyledDiv>
         </Wrapper>
      </Section>
   );
};

export default Contact;
