import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getOrder } from "../../Redux/Actions/OrderActions";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import Status from "../../shared/Status";

const StyledOrderDetails = styled.div`
   position: relative;

   h2 {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      font-weight: bolder;

      span {
         color: ${(props) => props.theme.colors.second};
      }

      button {
         position: absolute;
         top: -2.5rem;
         right: 0;
         padding: 0;
         cursor: pointer;
         background-color: ${(props) => props.theme.colors.second};
         padding: 0.35rem 0.5rem;
         border-radius: 3px;
         color: #fff;

         i {
            &:hover {
            }
         }
      }

      @media (min-width: ${(props) => props.theme.responsive.sm}) {
         button {
            margin-right: 0;
            margin-left: 0.5rem;
            position: initial;
         }
      }

      @media (min-width: ${(props) => props.theme.responsive.md}) {
         font-size: 1.15rem;
      }
   }

   h3 {
      font-size: 1.1rem;
      font-weight: 600;
      opacity: 0.9;
   }
`;

const Details = styled.div`
   @media (min-width: ${(props) => props.theme.responsive.md}) {
      border: 1.5px solid #ddd;
      padding: 1rem;
   }

   h3 {
      margin-bottom: 0.5rem;
   }

   & > div:nth-of-type(1) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-bottom: 1rem;
   }
`;

const OrderDate = styled.div`
   margin-bottom: 1rem;
   span {
      opacity: 0.95;
      background-color: #ddd;
      display: inline-block;
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      font-weight: 600;
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      margin-bottom: 0;
   }
`;

const Shipping = styled.div`
   display: flex;
   align-items: flex-start;
   overflow: auto;
   margin-bottom: 1rem;

   hr {
      margin: 0.5rem 0;
   }

   & > div {
      border: 1.5px solid #ddd;
      border-top-color: ${(props) => props.theme.colors.second};
      border-top-width: 2px;
      padding: 0.5rem 1rem 1rem;
      margin-bottom: 1rem;
      margin-right: 1rem;
      flex: 1;
   }

   ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
         margin-bottom: 0.5rem;
         padding-bottom: 0.5rem;
         border-bottom: 1px solid #ccc;
         display: flex;

         span {
            display: block;
         }

         span:nth-child(1) {
            font-weight: 600;
            margin-right: 0.5rem;
            min-width: 120px;

            @media (min-width: ${(props) => props.theme.responsive.md}) {
               min-width: 180px;
            }
         }

         span:nth-child(2) {
            font-weight: 500;
            text-align: right;
            flex-grow: 1;
            opacity: 0.9;
         }

         &:last-child {
            margin: 0;
         }
      }
   }
`;

const Timeline = styled.div`
   overflow: auto;

   hr {
      margin: 0.5rem 0;
   }

   & > div {
      display: inline-block;
      border: 1.5px solid #ddd;
      border-left-color: ${(props) => props.theme.colors.second};
      border-left-width: 2px;
      padding: 0.5rem 1rem 1rem;

      ul {
         list-style: none;
         margin: 0;
         padding: 0;
         li {
            padding: 0.5rem 1rem 0.8rem;
            margin: 0;
            border: 0;
            position: relative;
            border-bottom: 1px solid #eee;
            opacity: 0.8;
            min-width: 400px;

            &:before {
               content: "";
               display: block;
               position: absolute;
               width: 10px;
               height: 10px;
               top: 0.85rem;
               left: 0;
               background-color: #e7e7e7;
               border-radius: 50%;
            }

            &:after {
               content: "";
               display: block;
               position: absolute;
               width: 2px;
               height: 50px;
               top: 0.85rem;
               left: 4px;
               background-color: #e7e7e7;
            }

            &:last-child {
               font-weight: 600;
               opacity: 1;

               &:before {
                  background-color: #ccc;
               }

               &:after {
                  display: none;
               }
            }

            strong {
               margin-left: 1rem;
               opacity: 0.9;
               color: ${(props) => props.theme.colors.second};
            }
         }
      }
   }
`;

const Products = styled.div`
   overflow: auto;

   table {
      width: 700px;
      min-width: 700px;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      display: block;

      * {
         display: block;
      }

      thead {
         border-bottom: 1px solid #222;
         background-color: #eee;
      }

      tbody {
         tr {
            td:first-child {
               font-weight: 600;
            }
         }
      }

      tr {
         display: grid;
         text-align: left;
         border-bottom: 1px solid #222;

         grid-template-columns:
            minmax(250px, 30%) minmax(250px, 30%) minmax(100px, 20%)
            minmax(100px, 20%);

         &:last-child {
            border: none;
         }
      }

      td,
      th {
         border-right: 1px solid #222;
         padding: 0.5rem;
         display: flex;
         align-items: center;

         &:last-child {
            border: none;
         }
      }
   }
`;

const Back = styled.button`
   padding: 0;
   margin: 0 0 1rem;
   font-weight: bolder;
   font-size: smaller;
`;

const OrderDetails = ({ id }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const orderDetails = useSelector((state) => state.orderDetails);
   const { error, loading, order } = orderDetails;

   useEffect(() => {
      id && dispatch(getOrder(id));
   }, [id, dispatch]);

   return (
      <>
         <Back onClick={() => navigate("/orders")}>
            <i className="fa-solid fa-arrow-left-long"></i> Powrót
         </Back>
         {loading ? (
            <Loading />
         ) : error ? (
            <Message variant="error" context={error} />
         ) : (
            order && (
               <StyledOrderDetails>
                  <h2>
                     Zamówienie <span>#{order._id}</span>
                     <button title="Wydrukuj zamówienie">
                        <i className="fa-solid fa-print"></i>
                     </button>
                  </h2>
                  <Details>
                     <div>
                        <OrderDate>
                           <h3>Data złożenia:</h3>
                           <span>{order.createdAt}</span>
                        </OrderDate>
                        <div>
                           <h3>Status:</h3>
                           <Status
                              context={order.status.text}
                              title="Zmień status zamówienia"
                           />
                        </div>
                     </div>
                     <hr />
                     <Shipping>
                        <div>
                           <h3>Dane wysyłkowe:</h3>
                           <hr />
                           <ul>
                              <li>
                                 <span>Imię:</span>
                                 <span>{order.shippingAddress.name}</span>
                              </li>
                              <li>
                                 <span>Ulica:</span>
                                 <span>{order.shippingAddress.street}</span>
                              </li>
                              <li>
                                 <span>Miasto:</span>
                                 <span>{order.shippingAddress.city}</span>
                              </li>
                              <li>
                                 <span>Kod pocztowy:</span>
                                 <span>{order.shippingAddress.zip}</span>
                              </li>
                              <li>
                                 <span>E-mail:</span>
                                 <span>{order.shippingAddress.email}</span>
                              </li>
                              <li>
                                 <span>Telefon:</span>
                                 <span>{order.shippingAddress.phone}</span>
                              </li>
                              {order.comment && (
                                 <li>
                                    <span>Komentarz do zamówienia:</span>
                                    <span>{order.comment}</span>
                                 </li>
                              )}
                           </ul>
                        </div>
                        <div>
                           <h3>Dane klienta:</h3>
                           <hr />
                           <ul>
                              <li>
                                 <span>ID klienta:</span>
                                 <span>
                                    {order.user ? order.user._id : "Gość"}
                                 </span>
                              </li>
                              <li>
                                 <span>Imię:</span>
                                 <span>
                                    {order.user
                                       ? order.user.name
                                       : order.shippingAddress.name}
                                 </span>
                              </li>
                              <li>
                                 <span>E-mail:</span>
                                 <span>
                                    {order.user
                                       ? order.user.email
                                       : order.shippingAddress.email}
                                 </span>
                              </li>
                           </ul>
                        </div>
                        <div>
                           <h3>Podsumowanie:</h3>
                           <hr />
                           <ul>
                              <li>
                                 <span>Metoda wysyłki:</span>
                                 <span>{order.shippingMethod}</span>
                              </li>
                              <li>
                                 <span>Cena wysyłki:</span>
                                 <span>{order.shippingPrice} zł</span>
                              </li>
                              <li>
                                 <span>Zamówione produkty:</span>
                                 <span>{order.orderItems.length}</span>
                              </li>
                              <li>
                                 <span>Kwota zamówienia:</span>
                                 <span>{order.totalPrice} zł</span>
                              </li>
                           </ul>
                        </div>
                     </Shipping>
                     <Timeline>
                        <div>
                           <h3>Oś czasu:</h3>
                           <hr />
                           <ul>
                              <li>
                                 Zamówienie złożone:
                                 <strong>{order.createdAt}</strong>
                              </li>
                              {order.status.isPaid && (
                                 <li>
                                    Zamówienie opłacone:
                                    <strong>{order.status.paidAt}</strong>
                                 </li>
                              )}
                              {order.status.isSent && (
                                 <li>
                                    Zamówienie wysłane
                                    <strong>{order.status.sentAt}</strong>
                                 </li>
                              )}
                              {order.status.isDelivered && (
                                 <li>
                                    Zamówienie dostarczone:
                                    <strong>{order.status.deliveredAt}</strong>
                                 </li>
                              )}
                              {order.status.isCancled && (
                                 <li>
                                    Zamówienie anulowane:
                                    <strong>{order.status.cancledAt}</strong>
                                 </li>
                              )}
                           </ul>
                        </div>
                     </Timeline>
                     <hr />
                     <Products>
                        <h3>Zamówione produkty:</h3>
                        <table>
                           <thead>
                              <tr>
                                 <th>
                                    <span>ID produktu</span>
                                 </th>
                                 <th>
                                    <span>Nazwa</span>
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
                              {order?.orderItems.map((item) => (
                                 <tr key={item._id}>
                                    <td>
                                       <Link to={`/products/${item._id}`}>
                                          {item._id}
                                       </Link>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price} zł</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </Products>
                  </Details>
               </StyledOrderDetails>
            )
         )}
      </>
   );
};

export default OrderDetails;
