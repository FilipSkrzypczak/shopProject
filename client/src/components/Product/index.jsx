import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import Col from "../../shared/Col";
import Row from "../../shared/Row";
import { listProductDetails } from "../../Redux/Actions/ProductActions";
import Details from "./Details";
import Review from "./Review";
import Message from "../../shared/Message";
import Loading from "../../shared/Loading";

const StyledProduct = styled.div`
   ${(props) => props.theme.filled}
   padding:1.5rem 1rem;

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      padding: 2rem 1rem;
   }

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      padding: 2rem 1.5rem;
   }
`;

const Image = styled.img`
   margin-bottom: 1rem;
   max-height: 200px;
   margin-left: auto;
   margin-right: auto;

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      max-height: 300px;
      margin-bottom: 0;
   }
`;

const SingeProduct = () => {
   const dispatch = useDispatch();
   const params = useParams();

   const productId = params.id;
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;

   useEffect(() => {
      dispatch(listProductDetails(productId));
   }, [dispatch, productId]);

   return (
      <>
         {loading ? (
            <Loading />
         ) : !error && product ? (
            <StyledProduct>
               <Row>
                  <Col md="2">
                     <Image src={product.image} />
                  </Col>
                  <Col md="2">
                     <Details product={product} productId={productId} />
                  </Col>
               </Row>
               <Review product={product} productId={productId} />
            </StyledProduct>
         ) : (
            <Message context={error} variant="error" />
         )}
      </>
   );
};

export default SingeProduct;
