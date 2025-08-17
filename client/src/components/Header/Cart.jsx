import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledCart = styled.div`
   cursor: pointer;
   position: relative;
   text-align: center;

   span {
      position: absolute;
      display: block;
      border-radius: 3px;
      background-color: ${(props) => props.theme.colors.second};
      min-width: 25px;
      height: 16px;
      line-height: 16px;
      top: -17px;
      right: -5px;
      color: #fff;
      font-size: 60%;
      padding: 0 0.1rem;
   }
`;

const Cart = () => {
   const cart = useSelector((state) => state.cart);
   const { cartItems, quantity } = cart;

   return (
      <StyledCart>
         <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {quantity > 0 && <span>{quantity}</span>}
            <small>Koszyk</small>
         </Link>
      </StyledCart>
   );
};

export default Cart;
