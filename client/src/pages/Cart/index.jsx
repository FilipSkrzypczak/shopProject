import React from "react";
import { useSelector } from "react-redux";
import Col from "../../shared/Col";
import Row from "../../shared/Row";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";
import Content from "./Content";
import Summary from "./Summary";
import Top from "./Top";
import { addToCart } from "../../Redux/Actions/CartActions";
import styled from "styled-components";
import Button from "../../shared/Button";
import { Link } from "react-router-dom";

const Empty = styled.div`
   text-align: center;
   font-size: 1.3rem;
   margin-bottom: 10rem;
`;

const Cart = () => {
   const cart = useSelector((state) => state.cart);
   const { cartItems, total } = cart;

   return (
      <Section>
         <Wrapper>
            {cartItems.length === 0 ? (
               <Empty>
                  Koszyk jest pusty
                  <br />
                  <br />
                  <Link to="/products">
                     <Button>Dodaj produkty</Button>
                  </Link>
               </Empty>
            ) : (
               <>
                  <Top count={cartItems.length} />
                  <Row wrapLg="nowrap">
                     <Col grow="1" span="auto">
                        <Content cartItems={cartItems} addToCart={addToCart} />
                     </Col>
                     <Col lg="3">
                        <Summary cartItems={cartItems} total={total} />
                     </Col>
                  </Row>
               </>
            )}
         </Wrapper>
      </Section>
   );
};

export default Cart;
