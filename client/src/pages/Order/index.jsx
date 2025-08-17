import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import { getOrderDetails } from "../../Redux/Actions/OrderActions";
import Status from "../../shared/Status";

const StyledDiv = styled.div`
   ${(props) => props.theme.filled}
   padding:1rem;
   max-width: 600px;
   margin-left: auto;
   margin-right: auto;

   p {
      margin-bottom: 0.5rem;
      opacity: 0.8;
      font-size: smaller;

      i {
         margin-right: 0.25rem;
      }
   }

   h2 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: 600;

      strong {
         color: ${(props) => props.theme.colors.second};
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

const Order = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   const orderId = location.pathname.split("/order/")[1];

   const orderDetails = useSelector((state) => state.orderDetails);
   const { order, loading, error } = orderDetails;

   useEffect(() => {
      (!order || order?._id !== orderId) && dispatch(getOrderDetails(orderId));
   }, [order, dispatch, orderId]);

   return (
      <Section>
         <Wrapper>
            <StyledDiv>
               {loading ? (
                  <Loading />
               ) : !error && orderId === order?._id ? (
                  <>
                     <h2>
                        Szczegóły zamówienia <strong>#{order?._id}</strong>
                     </h2>
                     <hr />
                     <div>
                        <ul>
                           <li>
                              Zamówienie Nr: <b>{order._id}</b>
                           </li>
                           <li>
                              Data zamówienia: <b>{order.createdAt}</b>
                           </li>
                           <li>
                              Status: <Status context={order.status.text} />
                           </li>
                           <li>
                              Metoda wysyłki: <b>{order.shippingMethod}</b>
                           </li>
                           <li>Adres dostawy:</li>
                        </ul>
                        <Address>
                           <div>Imię: {order.shippingAddress.name}</div>
                           <div>Ulica: {order.shippingAddress.street}</div>
                           <div>Miasto: {order.shippingAddress.city}</div>
                           <div>Kod pocztowy: {order.shippingAddress.zip}</div>
                           <div>E-mail: {order.shippingAddress.email}</div>
                           <div>Telefon: {order.shippingAddress.phone}</div>
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
                                 {order.orderItems?.map((item) => (
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
                              Koszt dostawu: <b>{order.shippingPrice} zł</b>
                           </div>
                           <div>
                              Kwota całkowita: <b>{order.totalPrice} zł</b>
                           </div>
                        </Summary>
                     </div>
                     <p>
                        <i className="fa-solid fa-circle-info"></i>
                        Informacje o zamówieniu został wysłane na adres e-mail.
                     </p>
                  </>
               ) : (
                  <Message
                     variant="error"
                     context={error ? error : "Nie znaleziono zamówienia"}
                  />
               )}
            </StyledDiv>
         </Wrapper>
      </Section>
   );
};

export default Order;
