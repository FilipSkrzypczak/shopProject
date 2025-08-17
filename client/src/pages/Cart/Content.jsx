import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { removeFromCart } from "../../Redux/Actions/CartActions";

const Item = styled.div`
   ${(props) => props.theme.filled}
   margin-bottom: 0.5rem;
   padding: 1rem;
   position: relative;

   h3 {
      font-size: 1rem;
   }

   span {
      opacity: 0.5;
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.2rem;
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      display: flex;

      span {
         display: block;
         margin-bottom: 0.5rem;
      }
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      padding: 1.5rem 1rem;
   }
`;

const Remove = styled.div`
   position: absolute;
   top: -2px;
   left: -5px;
   background-color: ${(props) => props.theme.colors.second};
   border-radius: 50%;
   width: 20px;
   height: 20px;
   line-height: 20px;
   color: #fff;
   text-align: center;
   font-size: 0.8rem;
   cursor: pointer;
   transition: all 0.3s;

   &:hover {
      opacity: 0.5;
   }
`;
const Title = styled.div`
   margin-bottom: 1rem;

   img {
      max-width: 100px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 1.5rem;
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      display: flex;
      margin-bottom: 0;
      margin-right: auto;

      img {
         margin-bottom: 0;
         margin-right: 2rem;
      }
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      img {
         margin-left: 1rem;
      }
   }
`;

const Quantity = styled.div`
   margin-bottom: 0.5rem;
   display: flex;
   justify-content: space-between;
   text-align: right;

   input {
      width: 80px;
      text-align: center;
      padding: 0.2rem 0.5rem;
      outline: none;
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      display: block;
      text-align: left;
      margin-bottom: 0;
      margin-right: 2rem;
      margin-left: 2rem;
   }

   @media (min-width: ${(props) => props.theme.responsive.xl}) {
      select {
         width: 90px;
      }
   }
`;

const Price = styled.div`
   font-size: 1.3rem;
   font-weight: 600;
   display: flex;
   justify-content: space-between;
   text-align: right;
   flex-shrink: 0;

   div {
      span {
         display: block;
         margin-top: 0.2rem;
      }
   }

   @media (min-width: ${(props) => props.theme.responsive.sm}) {
      display: block;
      min-width: 80px;
   }

   @media (min-width: ${(props) => props.theme.responsive.xl}) {
      min-width: 100px;
   }
`;

const Content = ({ cartItems, addToCart }) => {
   const dispatch = useDispatch();

   const removeFromCartHandle = (item) => {
      dispatch(removeFromCart(item));
   };

   return (
      <>
         {cartItems?.map((item) => {
            return (
               <Item key={item._id}>
                  <Remove onClick={() => removeFromCartHandle(item)}>
                     <i className="fas fa-times"></i>
                  </Remove>
                  <Title>
                     <img src={item.image} alt={item.name} />
                     <h3>
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                     </h3>
                  </Title>
                  <Quantity>
                     <span>Ilość:</span>
                     <input
                        type="text"
                        defaultValue={item.qty}
                        onInput={(e) => {
                           if (
                              isNaN(Number(e.target.value)) ||
                              e.target.value[e.target.value.length - 1] === " "
                           ) {
                              return (e.target.value = e.target.value.slice(
                                 0,
                                 -1
                              ));
                           }
                        }}
                        onBlur={(e) => {
                           const val =
                              Number(e.target.value) < 1 ||
                              isNaN(Number(e.target.value))
                                 ? 1
                                 : Number(e.target.value) > 10000
                                 ? 10000
                                 : Number(e.target.value);

                           e.target.value = val;

                           dispatch(addToCart(item._id, val, true));
                        }}
                     />
                  </Quantity>
                  <Price>
                     <span>Kwota:</span>
                     <div>
                        {item.qty * item.price} zł
                        <span>
                           {item.qty} x {item.price} zł
                        </span>
                     </div>
                  </Price>
               </Item>
            );
         })}
      </>
   );
};

export default Content;
