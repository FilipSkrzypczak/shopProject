import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Product from "../../shared/Product";
import Row from "../../shared/Row";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import Col from "../../shared/Col";

const Content = styled.div`
   text-align: center;
   margin-bottom: 3.5rem;
`;

const Title = styled.div`
   margin-bottom: 1rem;
   font-size: 1.5rem;
   padding: 0.5rem;
   font-weight: 500;
   font-family: "Kanit";
`;

const Home = () => {
   const dispatch = useDispatch();

   const productList = useSelector((state) => state.productList);
   const { loading, error, products } = productList;

   useEffect(() => {
      dispatch(listProduct());
   }, [dispatch]);

   const recommendedProducts = () => {
      return [...products].sort(
         (a, b) => b.reviews.length + b.rating - (a.reviews.length + a.rating)
      );
   };

   return (
      <>
         <Section>
            <Wrapper>
               {loading ? (
                  <Loading />
               ) : !error ? (
                  <>
                     <Content>
                        <Title>Polecane produkty</Title>
                        <Row>
                           {recommendedProducts()
                              ?.slice(0, 4)
                              .map((item) => {
                                 return (
                                    <Col xsm="2" md="3" lg="4" key={item._id}>
                                       <Product item={item} />
                                    </Col>
                                 );
                              })}
                        </Row>
                     </Content>
                     <Content>
                        <Title>Nowości</Title>
                        <Row>
                           {products?.slice(0, 4).map((item) => {
                              return (
                                 <Col xsm="2" md="3" lg="4" key={item._id}>
                                    <Product item={item} />
                                 </Col>
                              );
                           })}
                        </Row>
                     </Content>
                  </>
               ) : (
                  <Message context={error} variant="error" />
               )}
            </Wrapper>
         </Section>
      </>
   );
};

export default Home;
