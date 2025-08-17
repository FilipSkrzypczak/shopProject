import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { listOrders } from "../../Redux/Actions/OrderActions";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import Status from "../../shared/Status";

const StyledOrderList = styled.div`
   overflow: auto;

   h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 1rem;
   }

   table {
      width: 980px;
      min-width: 980px;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      display: block;

      @media (min-width: ${(props) => props.theme.responsive.md}) {
         width: 1135px;
         min-width: 1135px;
      }

      * {
         display: block;
      }

      small {
         margin-left: 0.2rem;
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

            td:last-child {
               padding: 0.4rem;
               justify-content: center;

               span {
                  background-color: ${(props) => props.theme.colors.second};
                  color: #fff;
                  padding: 0.3rem 0.5rem;
                  border-radius: 4px;
                  cursor: pointer;

                  &:hover {
                     opacity: 0.75;
                  }
               }
            }
         }
      }

      tr {
         display: grid;
         text-align: left;
         border-bottom: 1px solid #222;

         grid-template-columns:
            minmax(230px, 30%) minmax(250px, 30%) minmax(110px, 10%)
            minmax(200px, 10%) minmax(130px, 15%) minmax(60px, 5%);

         @media (min-width: ${(props) => props.theme.responsive.md}) {
            grid-template-columns:
               minmax(250px, 30%) minmax(280px, 30%) minmax(110px, 10%)
               minmax(220px, 10%) minmax(200px, 15%) minmax(75px, 5%);
         }

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
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
         rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      left: 50%;
      top: 10%;
      transform: translateX(-50%);
      position: absolute;
      padding: 2.5rem 2rem 2rem;

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

const Info = styled.div`
   max-width: 350px;
`;

const OrderList = () => {
   const dispatch = useDispatch();

   const orderList = useSelector((state) => state.orderList);
   const { error, loading, orders } = orderList;

   useEffect(() => {
      dispatch(listOrders());
   }, [dispatch]);

   return (
      <>
         <Info>{error && <Message variant="error" context={error} />}</Info>
         {loading ? (
            <Loading />
         ) : (
            <StyledOrderList>
               <h2>Lista zamówień:</h2>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <span>ID zamówienia</span>
                        </th>
                        <th>
                           <span>Klient</span>
                        </th>
                        <th>
                           <span>Kwota</span>
                        </th>
                        <th>
                           <span>Status</span>
                        </th>
                        <th>
                           <span>Data złożenia</span>
                        </th>
                        <th>
                           <span>Opcje</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders?.map((item) => (
                        <tr key={item._id}>
                           <td>{item._id}</td>
                           <td>
                              Imię:{" "}
                              {item.user
                                 ? item.user.name
                                 : item.shippingAddress.name}{" "}
                              <br />
                              ID: {item.user ? item.user._id : "gość"}
                           </td>
                           <td>{item.totalPrice} zł</td>
                           <td>
                              <Status
                                 context={item?.status.text}
                                 title="Zmień status zamówienia"
                              />
                           </td>
                           <td>{item.createdAt}</td>
                           <td>
                              <Link to={`/orders/${item._id}`}>
                                 <span>
                                    <i className="fa-solid fa-ellipsis"></i>
                                 </span>
                              </Link>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </StyledOrderList>
         )}
      </>
   );
};

export default OrderList;
