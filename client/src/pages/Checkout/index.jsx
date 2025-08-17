import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";
import Address from "./Address";
import Payment from "./Payment";
import Shipping from "./Shipping";
import Summary from "./Summary";
import Row from "../../shared/Row";
import Col from "../../shared/Col";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrder } from "../../Redux/Actions/OrderActions";
import Message from "../../shared/Message";

const StyledCheckout = styled.div`
   h2 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
   }

   h3 {
      margin-bottom: 0.75rem;
   }

   p {
      margin-bottom: 0.5rem;
      opacity: 0.8;
      font-size: smaller;

      i {
         margin-right: 0.25rem;
      }
   }

   a {
      color: #ec0000;
   }

   label {
      display: flex;
      margin-bottom: 0.5rem;
      border: 1px solid #ccc;
      padding: 0.5rem 0.7rem;
      border-radius: 4px;
      cursor: pointer;

      &:last-child {
         margin-bottom: 0;
      }

      input {
         margin-right: 0.5rem;
         margin-top: 0.25rem;
      }

      div {
         margin-right: auto;
         span:first-child {
            font-weight: 600;
         }
         span:nth-child(2) {
            /* margin-left: 0.5rem; */
            opacity: 0.7;
            display: block;
         }
      }

      img {
         opacity: 0.85;
      }

      @media (min-width: ${(props) => props.theme.responsive.sm}) {
         align-items: center;

         input {
            margin-right: 1rem;
            margin-top: 0;
         }

         div {
            display: flex;

            span:nth-child(2) {
               margin-left: 0.5rem;
            }
         }
      }
   }
`;

const Comment = styled.div`
   margin-bottom: 1rem;
   padding-bottom: 1.5rem;
   border-bottom: 1px solid #ccc;

   p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.8;
   }

   textarea {
      margin-top: 1rem;
      min-height: 80px;
      width: 100%;
      max-width: 350px;
      outline: none;
      padding: 0.5rem;
      font-size: smaller;
   }
`;

const Agree = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem 1.5rem;

   label {
      margin-top: 0.5rem;
      border: none;
      padding: 0;
      display: inline-flex;

      div {
         display: block;
      }
   }
`;

const Checkout = () => {
   const [shippingMethod, setShippingMethod] = useState(["kurier_inpost", 10]);
   const [paymentMethod, setPaymentMethod] = useState(1);
   const [shippingAddress, setShippingAddress] = useState({
      name: "",
      street: "",
      zip: "",
      city: "",
      email: "",
      phone: "",
   });
   const [comment, setComment] = useState("");

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const userDetails = useSelector((state) => state.user);
   const { address, userInfo } = userDetails;

   const cart = useSelector((state) => state.cart);
   const { total, cartItems } = cart;

   const orderDetails = useSelector((state) => state.orderDetails);
   const { order, loading } = orderDetails;

   useEffect(() => {
      if (!order && (!cartItems || cartItems?.length < 1)) {
         navigate("/cart");
      }
   }, [order, cartItems, navigate]);

   useEffect(() => {
      if (address) {
         setShippingAddress(address);
      }
   }, [address]);

   const totalPrice = (Number(total) + Number(shippingMethod[1])).toFixed(2);

   const submitHandler = (e) => {
      e.preventDefault();

      dispatch(
         createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            shippingMethod: shippingMethod[0],
            totalPrice,
            shippingPrice: shippingMethod[1],
            comment,
         })
      ).then((response) => {
         if (response) {
            navigate(`/order/${response._id}`);
         }
      });
   };

   return (
      <Section>
         <Wrapper>
            {cartItems.length > 0 && (
               <>
                     <StyledCheckout>
                        <h2>Dostawa i płatność</h2>
                        <form onSubmit={submitHandler}>
                           <Row wrapLg="nowrap">
                              <Col grow="1" span="auto">
                                 <Shipping setShipment={setShippingMethod} />
                                 <Payment setPayment={setPaymentMethod} />
                                 <Address
                                    address={shippingAddress}
                                    setAddress={setShippingAddress}
                                    setComment={setComment}
                                 />
                                 <Agree>
                                    <Comment>
                                       <p>
                                          <b>Dodaj komentarz do zamówienia</b>
                                       </p>
                                       <textarea
                                          value={comment}
                                          onInput={(e) =>
                                             setComment(e.target.value)
                                          }
                                          maxLength={300}
                                       />
                                    </Comment>
                                    {!userInfo && !userInfo?.acceptRegulations && (
                                       <>
                                          <h3>Zgody formalne</h3>
                                          <p>
                                             <i className="fa-solid fa-circle-info"></i>
                                             Pamiętaj, Twoje dane są u nas
                                             bezpieczne, a zgodę możesz wycofać
                                             w każdej chwili
                                          </p>
                                          <label>
                                             <input
                                                type="checkbox"
                                                name="agree"
                                                required
                                             />
                                             <div>
                                                Akceptuję{" "}
                                                <Link
                                                   to="/policy"
                                                   target="_blank"
                                                >
                                                   regulamin
                                                </Link>{" "}
                                                sklepu *
                                             </div>
                                          </label>
                                       </>
                                    )}
                                 </Agree>
                              </Col>
                              <Col lg="3">
                                 <Summary
                                    cartItems={cartItems}
                                    total={totalPrice}
                                    shippingPrice={shippingMethod[1]}
                                    loading={loading}
                                 />
                              </Col>
                           </Row>
                        </form>
                     </StyledCheckout>
               </>
            )}
         </Wrapper>
      </Section>
   );
};

export default Checkout;
