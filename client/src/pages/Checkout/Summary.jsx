import React from "react";
import styled from "styled-components";
import Button from "../../shared/Button";

const StyledSummary = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem;
   margin-bottom: 0.5rem;
   position: sticky;
   top: 0;

   & > div:nth-of-type(1) {
      overflow: auto;
   }

   & > div:nth-of-type(2) {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;

      span {
         font-weight: bold;
         text-align: right;

         small {
            display: block;
            font-weight: 600;
            opacity: 0.65;
            font-size: small;
         }
      }
   }

   table {
      border: 1px solid #222;
      display: block;
      font-size: smaller;
      min-width: 325px;
      margin-bottom: 1rem;

      * {
         display: block;
      }

      thead {
         border-bottom: 1px solid #222;
         background-color: #eee;
      }

      tbody {
         td:last-child {
            span {
               display: block;
            }

            span:nth-of-type(1) {
               opacity: 0.75;
               font-size: smaller;
               padding-bottom: 0.15rem;
               margin-bottom: 0.15rem;
               border-bottom: 1px solid #ddd;
            }
         }
      }

      tr {
         display: grid;
         text-align: left;
         border-bottom: 1px solid #222;

         grid-template-columns: minmax(150px, 70%) minmax(60px, 10%) minmax(
               95px,
               20%
            );

         @media (min-width: ${(props) => props.theme.responsive.lg}) {
            grid-template-columns: minmax(150px, 50%) minmax(55px, 10%) minmax(
                  100px,
                  40%
               );
         }

         &:last-child {
            border: none;
         }
      }

      td,
      th {
         border-right: 1px solid #222;
         padding: 0.2rem 0.4rem;
         /* display: flex;
         align-items: center; */

         small {
            opacity: 0.65;
         }

         &:last-child {
            border: none;
         }
      }
   }

   button {
      width: 100%;
   }
`;

const Summary = ({ loading, cartItems, total, shippingPrice }) => {
   return (
      <StyledSummary>
         <div>
            <table>
               <thead>
                  <tr>
                     <th>
                        <span>Produkt</span>
                     </th>
                     <th>
                        <span>Ilość</span>
                     </th>
                     <th>
                        <span>Kwota</span>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {cartItems.map((item) => {
                     return (
                        <tr key={item._id}>
                           <td>{item.name}</td>
                           <td>{item.qty}</td>
                           <td>
                              <span>{item.qty + " x " + item.price} zł</span>
                              <span>{item.qty * item.price} zł</span>
                              {/* <br />
                              <small>
                                 [{item.qty + " x " + item.price} zł]
                              </small> */}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         <hr />
         <div>
            Kwota całkowita:{" "}
            <span>
               {total} zł <small>(wysyłka: {shippingPrice} zł)</small>
            </span>
         </div>
         <Button disabled={loading}>Kupuję i płacę</Button>
      </StyledSummary>
   );
};

export default Summary;
