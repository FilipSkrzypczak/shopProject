import React from "react";
import styled from "styled-components";

const StyledPayment = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem 1.5rem;
   margin-bottom: 0.5rem;
`;

const Payment = ({ setPayment }) => {
   return (
      <StyledPayment>
         <h3>Metoda płatności</h3>
         <div>
            <label>
               <input
                  type="radio"
                  name="payment"
                  value={1}
                  defaultChecked
                  onChange={(e) => setPayment(Number(e.target.value))}
               />
               <div>
                  <span>Płatność online</span>
               </div>
               {/* <img src="/images/pay.png" alt="ikona" /> */}
            </label>
         </div>
      </StyledPayment>
   );
};

export default Payment;
