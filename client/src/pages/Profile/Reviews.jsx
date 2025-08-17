import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../../Redux/Actions/UserActions";
import styled from "styled-components";
import Loading from "../../shared/Loading";
import Rating from "../../shared/Rating";
import Message from "../../shared/Message";

const Table = styled.div`
   overflow: auto;

   table {
      text-align: left;
      border-spacing: 0;

      td,
      th {
         vertical-align: top;
         padding: 0.5rem;
         border: 1px solid #ccc;
      }

      td:nth-child(1) {
         max-width: 250px;
         min-width: 250px;
      }
      td:nth-child(2) {
         min-width: 200px;
      }

      td:nth-child(3) {
         min-width: 120px;
      }
   }
   p {
      margin: 0;
      font-weight: 600;
      margin-bottom: 0.5rem;
   }

   & > div {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      margin-bottom: 1rem;

      & > * {
         margin-bottom: 0.5rem;
      }

      span {
         display: inline-block;
      }

      a {
         opacity: 0.8;
      }
   }
`;

const Reviews = () => {
   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.user);
   const { loading, error, userReviews } = userLogin;

   useEffect(() => {
      dispatch(getUserReviews());
   }, [dispatch]);

   return (
      <div>
         <p>Twoje opinie:</p>
         {error && <Message variant="error" context={error} />}
         {loading ? (
            <Loading />
         ) : (
            !error && (
               <Table>
                  <table>
                     <thead>
                        <tr>
                           <th>Produkt</th>
                           <th>Komentarz</th>
                           <th>Ocena</th>
                        </tr>
                     </thead>
                     <tbody>
                        {userReviews?.map((item) => (
                           <tr key={item._id}>
                              <td>
                                 <Link to={`/products/${item.id}`}>
                                    {item.productName}
                                 </Link>
                              </td>
                              <td>
                                 <span>{item.review.comment}</span>
                              </td>
                              <td>
                                 <Rating value={item.review.rating} />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </Table>
            )
         )}
      </div>
   );
};

export default Reviews;
