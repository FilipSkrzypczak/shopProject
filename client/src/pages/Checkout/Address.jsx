import React from "react";
import styled from "styled-components";

const StyledAddress = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem 1.5rem;
   margin-bottom: 0.5rem;
`;

const Input = styled.div`
   max-width: 350px;
   position: relative;
   margin-bottom: 1.5rem;

   input {
      display: block;
      padding: 0.3rem 0.75rem;
      width: 100%;
      outline: none;

      /* &:focus + span {
         opacity: 1;
         top: -10px;
      } */
   }

   span {
      display: block;
      font-size: small;
      position: absolute;
      /* top: 0px;
      opacity: 0; */
      opacity: 1;
      top: -10px;
      left: 5px;
      background-color: #fff;
      padding: 0 0.5rem;
      pointer-events: none;
      transition: all 0.3s;
   }
`;

const Address = ({ address, setAddress }) => {
   return (
      <StyledAddress>
         <h3>Dane odbiorcy</h3>
         <Input>
            <input
               required
               type="text"
               value={address.name}
               placeholder="Imię i nazwisko lub nazwa firmy"
               onInput={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <span>Imię i nazwisko lub nazwa firm</span>
         </Input>
         <Input>
            <input
               required
               type="text"
               placeholder="Ulica i numer"
               value={address.street}
               onInput={(e) =>
                  setAddress({ ...address, street: e.target.value })
               }
            />
            <span>Ulica i numer</span>
         </Input>
         <Input>
            <input
               required
               type="text"
               placeholder="Kod pocztowy"
               value={address.zip}
               onInput={(e) => setAddress({ ...address, zip: e.target.value })}
            />
            <span>Kod pocztowy</span>
         </Input>
         <Input>
            <input
               required
               type="text"
               placeholder="Miejscowość"
               value={address.city}
               onInput={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <span>Miejscowość</span>
         </Input>
         <Input>
            <input
               required
               type="email"
               placeholder="E-mail"
               value={address.email}
               onInput={(e) =>
                  setAddress({ ...address, email: e.target.value })
               }
            />
            <span>E-mail</span>
         </Input>
         <Input>
            <input
               required
               type="text"
               placeholder="Telefon"
               minLength={1}
               maxLength={9}
               value={address.phone}
               onInput={(e) =>
                  setAddress({ ...address, phone: e.target.value })
               }
            />
            <span>Telefon</span>
         </Input>
         <p>
            <i className="fa-solid fa-circle-info"></i> Fakturę wystawimy na
            dane odbiorcy.
         </p>
      </StyledAddress>
   );
};

export default Address;
