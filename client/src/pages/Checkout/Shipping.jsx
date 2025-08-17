import React from "react";
import styled from "styled-components";

const StyledShipping = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem 1.5rem;
   margin-bottom: 0.5rem;
   button {
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
         rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      background-color: #ffe14c;
      font-weight: 500;

      @media (min-width: ${(props) => props.theme.responsive.sm}) {
         padding: 0.5rem 1rem;
      }
   }
`;

const handleClick = (e) => {
   e.preventDefault();
};

const Shipping = ({ setShipment }) => {
   return (
      <StyledShipping>
         <h3>Sposób dostawy</h3>
         <div>
            <label>
               <input
                  type="radio"
                  name="shipment"
                  defaultChecked
                  value="kurier_inpost"
                  data-price="10"
                  onChange={(e) =>
                     setShipment([e.target.value, e.target.dataset.price])
                  }
               />
               <div>
                  <span>Kurier InPost</span>
                  <span>(10 zł)</span>
               </div>
            </label>
            <label>
               <input
                  type="radio"
                  name="shipment"
                  value="kurier_gls"
                  data-price="5"
                  onChange={(e) =>
                     setShipment([e.target.value, e.target.dataset.price])
                  }
               />
               <div>
                  <span>Kurier GLS</span>
                  <span>(5 zł)</span>
               </div>
            </label>
            {/* <label>
               <input type="radio" name="shipment" />
               <div>
                  <span>Paczkomat InPost</span>
                  <span>(2 zł)</span>
               </div>
               <button onClick={handleClick}>Wybierz paczkomat</button>
            </label> */}
         </div>
      </StyledShipping>
   );
};

export default Shipping;
