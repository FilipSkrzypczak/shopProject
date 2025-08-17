import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createProductReview } from "../../Redux/Actions/ProductActions";
import Button from "../../shared/Button";
import Col from "../../shared/Col";
import Message from "../../shared/Message";
import Rating from "../../shared/Rating";
import Row from "../../shared/Row";

const StyledReview = styled.div`
   border-top: 1px solid #ccc;
   padding-top: 1.5rem;
   margin-top: 2rem;

   h3 {
      margin-bottom: 1rem;
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      margin-top: 3rem;
   }
`;

const Add = styled.div`
   form {
      display: flex;
      flex-direction: column;

      strong {
         margin-bottom: 0.5rem;
         font-size: 1.1rem;
      }

      & > div {
         display: flex;
         align-items: center;
         margin-bottom: 1.5rem;
      }

      select {
         cursor: pointer;
         margin-left: 1rem;
         text-align: center;
         font-weight: 500;
         border: none;
         outline: none;
         height: 30px;
         padding: 0 0.5rem;
         border: 1px solid #222;
         border-radius: 2px;
      }

      textarea {
         margin-bottom: 1rem;
         min-height: 100px;
         padding: 0.5rem;
         outline: none;
      }
   }
`;

const View = styled.div`
   border-bottom: 1px solid #ccc;
   margin-bottom: 1rem;
   padding-bottom: 1rem;

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
      margin-right: 1rem;
   }
`;

const ViewItem = styled.div`
   border-top: 1px solid #eee;
   padding: 1rem 0;

   & > div:first-child {
      margin-bottom: 1rem;

      strong {
         margin-bottom: 0.5rem;
         margin-right: 1rem;
         display: block;
         flex-grow: 1;
         max-width: 100px;
      }

      div {
         display: flex;
         align-items: center;

         span {
            margin-left: 0.5rem;
            opacity: 0.7;

            i {
               margin-right: 0.5rem;
            }
         }
      }

      @media (min-width: ${(props) => props.theme.responsive.sm}) {
         display: flex;
         align-items: center;

         strong {
            margin-bottom: 0;
         }
      }

      @media (min-width: ${(props) => props.theme.responsive.md}) {
         display: block;

         strong {
            margin-bottom: 0.5rem;
         }
      }

      @media (min-width: ${(props) => props.theme.responsive.lg}) {
         display: flex;

         strong {
            margin-bottom: 0;
         }
      }
   }
`;

const Review = ({ product, productId }) => {
   const dispatch = useDispatch();

   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");

   const userLogin = useSelector((state) => state.user);
   const { userInfo } = userLogin;

   const productReview = useSelector((state) => state.productDetails);
   const { loading, errorReview } = productReview;

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(
         createProductReview(productId, {
            rating,
            comment,
         })
      ).then((response) => {
         if (response) {
            window.location.href = `/products/${productId}`;
         }
      });
   };

   return (
      <StyledReview id="view-review">
         <Row>
            <Col md="2">
               <h3>Opinie użytkowników ({product.reviews.length})</h3>
               <View>
                  {product.reviews.map((review) => (
                     <ViewItem key={review._id}>
                        <div>
                           <strong>{review.name.split(" ")[0]}</strong>
                           <div>
                              <Rating value={review.rating} />
                              <span>
                                 <i className="fa-solid fa-ellipsis"></i>{" "}
                                 {moment(review.createdAt).calendar()}
                              </span>
                           </div>
                        </div>
                        <div>{review.comment}</div>
                     </ViewItem>
                  ))}
               </View>
            </Col>
            <Col md="2">
               {errorReview && (
                  <Message variant="error" context={errorReview} />
               )}
               <h3>Napisz swoją opinię</h3>
               <Add>
                  {userInfo ? (
                     <form onSubmit={submitHandler}>
                        <strong>Ocena</strong>
                        <div>
                           <Rating
                              value={rating}
                              size="1.1rem"
                              onClick={(e) => console.log(e.target)}
                           />
                           <select
                              value={rating}
                              required
                              onChange={(e) => setRating(e.target.value)}
                           >
                              <option value="">Wybierz...</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                           </select>
                        </div>
                        <strong>Komentarz</strong>
                        <textarea
                           value={comment}
                           required
                           onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <Button disabled={loading}>Dodaj opinię</Button>
                     </form>
                  ) : (
                     <Message
                        variant="info"
                        context={
                           <>
                              <Link to="/login">
                                 <strong>Zaloguj się</strong>
                              </Link>{" "}
                              by napisać opinię
                           </>
                        }
                     ></Message>
                  )}
               </Add>
            </Col>
         </Row>
      </StyledReview>
   );
};

export default Review;
