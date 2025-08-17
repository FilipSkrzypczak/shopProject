import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listUserOrders } from "../../Redux/Actions/OrderActions";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import Status from "../../shared/Status";
import StyledOrder from "../../shared/StyledOrder";

const Popup = styled.div`
   animation: show 0.5s both;
   position: fixed;
   width: 100%;
   height: 100%;
   left: 0;
   top: 0;
   right: 0;
   bottom: 0;
   background-color: #00000031;
   z-index: 100;

   & > div {
      max-width: 95%;
      max-height: 85%;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
         rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      left: 50%;
      top: 10%;
      transform: translateX(-50%);
      position: absolute;
      overflow-y: auto;

      & > span {
         cursor: pointer;
         font-family: "Kanit";
         font-weight: 500;
         position: absolute;
         top: 0.5rem;
         right: 0.75rem;
         font-size: 1.2rem;

         &:hover {
            opacity: 0.6;
         }
      }

      & > div {
         padding: 2.5rem 1rem 1.5rem;

         @media (min-width: ${(props) => props.theme.responsive.sm}) {
            padding: 2.5rem 2rem 1.5rem;
         }
      }

      ul {
         list-style: none;
         padding: 0;
         margin: 0;

         li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            flex-wrap: wrap;

            @media (min-width: ${(props) => props.theme.responsive.sm}) {
               flex-wrap: nowrap;

               b {
                  margin-left: 1rem;
               }
            }

            &:last-child {
               margin: 0;
               border: none;
               margin-bottom: 0.35rem;
               padding-bottom: 0;
            }
         }
      }
   }

   @keyframes show {
      from {
         opacity: 0;
         top: -1rem;
      }

      to {
         opacity: 1;
         top: 0;
      }
   }
`;

const Address = styled.div`
   padding: 0 !important;
   opacity: 0.8;
   display: inline-block;

   & > div {
      padding: 0 !important;
      margin-bottom: 0.25rem;
   }
`;

const Table = styled.div`
   overflow: auto;

   table {
      text-align: left;
      border-spacing: 0;
      margin: 1rem 0;

      td,
      th {
         vertical-align: top;
         padding: 0.5rem;
         border: 1px solid #ccc;
      }

      thead {
         background-color: #eee;
      }

      td:nth-child(1) {
         min-width: 250px;
      }

      td:nth-child(2) {
         min-width: 80px;
      }

      td:nth-child(3) {
         min-width: 110px;
      }
   }
`;

const Summary = styled.div`
   div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      &:last-child {
         margin: 0;
      }
   }
`;

const Orders = () => {
   const dispatch = useDispatch();
   const [popup, setPopup] = useState([false, {}]);

   const orderList = useSelector((state) => state.orderList);
   const { loading, error, orders } = orderList;

   useEffect(() => {
      dispatch(listUserOrders());
   }, [dispatch]);

   return (
      <div>
         {popup[0] && (
            <Popup>
               <div>
                  <span onClick={() => setPopup([false, "", []])}>
                     <i className="fa-solid fa-x"></i>
                  </span>
                  <div>
                     <ul>
                        <li>
                           Zamówienie Nr: <b>{popup[1]._id}</b>
                        </li>
                        <li>
                           Data zamówienia: <b>{popup[1].createdAt}</b>
                        </li>
                        <li>
                           Status: <Status context={popup[1].status.text} />
                        </li>
                        <li>
                           Metoda wysyłki: <b>{popup[1].shippingMethod}</b>
                        </li>
                        <li>Adres dostawy:</li>
                     </ul>
                     <Address>
                        <div>Imię: {popup[1].shippingAddress.name}</div>
                        <div>Ulica: {popup[1].shippingAddress.street}</div>
                        <div>Miasto: {popup[1].shippingAddress.city}</div>
                        <div>Kod pocztowy: {popup[1].shippingAddress.zip}</div>
                        <div>E-mail: {popup[1].shippingAddress.email}</div>
                        <div>Telefon: {popup[1].shippingAddress.phone}</div>
                     </Address>
                     <hr />
                     <Table>
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
                                    <span>Cena</span>
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {popup[1].orderItems?.map((item) => (
                                 <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price} zł</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </Table>
                     <hr />
                     <Summary>
                        <div>
                           Koszt dostawu: <b>{popup[1].shippingPrice} zł</b>
                        </div>
                        <div>
                           Kwota całkowita: <b>{popup[1].totalPrice} zł</b>
                        </div>
                     </Summary>
                  </div>
               </div>
            </Popup>
         )}
         <p>Twoje zamówienia:</p>
         {error && <Message variant="error" context={error} />}
         {loading ? (
            <Loading />
         ) : (
            !error && (
               <div>
                  {orders?.map((item) => (
                     <StyledOrder key={item._id}>
                        <div>
                           <span>Zamówienie Nr:</span>
                           <b>{item._id}</b>
                        </div>
                        <div>
                           <span>Data zamówienia: </span>
                           <b>{item.createdAt}</b>
                        </div>
                        <div>
                           <span>Status:</span>
                           <b>
                              <Status context={item.status.text} />
                           </b>
                        </div>
                        <div>
                           <span>Kwota zamówienia:</span>
                           <b>{item.totalPrice} zł</b>
                        </div>
                        <button onClick={() => setPopup([true, item])}>
                           Pokaż więcej &raquo;
                        </button>
                     </StyledOrder>
                  ))}
               </div>
            )
         )}
      </div>
   );
};

export default Orders;
