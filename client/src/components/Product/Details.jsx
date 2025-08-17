import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../../Redux/Actions/CartActions";
import Button from "../../shared/Button";
import Rating from "../../shared/Rating";
import Message from "../../shared/Message";

const StyledDetails = styled.div`
   h2 {
      margin-bottom: 1rem;
      font-size: 1.3rem;
   }

   p {
      opacity: 0.85;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #ccc;
   }

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      h2 {
         font-size: 1.5rem;
      }
   }
`;

const Price = styled.div`
   font-size: 1.3rem;
   font-weight: 600;
   margin-bottom: 1rem;

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      margin-bottom: 2rem;
   }
`;

const Count = styled.div`
   margin: 1rem 0;
`;

const Select = styled.div`
   display: flex;
   align-items: flex-start;

   input {
      margin-left: 1rem;
      width: 70px;
      padding: 0.5rem;
      border: 1px solid ${(props) => props.theme.colors.second};
      border-top-width: 2px;
      outline: none;
      text-align: center;
   }
`;

const Details = ({ product, productId }) => {
   const dispatch = useDispatch();

   const [qty, setQty] = useState(1);
   const [success, setSuccess] = useState();

   return (
      <StyledDetails>
         {success && (
            <Message
               isFixed={true}
               variant="success"
               context="Produkt dodany do koszyka."
            />
         )}
         <h2>{product.name}</h2>
         <Rating
            value={product.rating}
            size="1rem"
            text={
               product.reviews.length > 1
                  ? product.reviews.length < 5
                     ? product.reviews.length + " opinie"
                     : product.reviews.length + " opinii"
                  : product.reviews.length === 0
                  ? product.reviews.length + " opinii"
                  : product.reviews.length + " opinia"
            }
            target="view-review"
         />
         <p>{product.description}</p>
         <Count>
            W magazynie: <b>{product.countInStock} szt.</b>
         </Count>
         <Price>
            {product.price} <small>zł</small>
         </Price>
         {product.countInStock ? (
            <Select>
               <Button
                  onClick={() => {
                     dispatch(addToCart(productId, Number(qty)));
                     setSuccess(true);
                     setTimeout(() => {
                        setSuccess(false);
                     }, 1200);
                  }}
                  disabled={success}
               >
                  Dodaj do koszyka
               </Button>
               <input
                  type="text"
                  value={qty}
                  onInput={(e) => {
                     if (isNaN(Number(e.target.value))) {
                        return;
                     }
                     Number(e.target.value) > 10000 && (e.target.value = 10000);
                     setQty(Number(e.target.value));
                  }}
                  onBlur={(e) => Number(e.target.value) < 1 && setQty(1)}
               />
            </Select>
         ) : (
            <Button disabled>Produkt niedostępny</Button>
         )}
      </StyledDetails>
   );
};

export default Details;
