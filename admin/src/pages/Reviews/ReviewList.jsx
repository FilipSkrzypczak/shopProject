import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listReviews } from "../../Redux/Actions/ProductActions";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import Button from "../../shared/Button";

const StyledUserList = styled.div`
   overflow: auto;

   h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 1rem;
   }

   h3 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      opacity: 0.5;
      font-weight: bold;
   }

   table {
      width: 700px;
      min-width: 700px;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      display: block;

      * {
         display: block;
      }

      ul {
         padding: 0;
         margin: 0;

         li {
            margin-bottom: 0.25rem;

            &:last-child {
               margin-bottom: 0;
            }
         }
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
         }
      }

      tr {
         display: grid;
         text-align: left;
         border-bottom: 1px solid #222;

         grid-template-columns:
            minmax(250px, 50%) minmax(200px, 30%) minmax(70px, 10%)
            minmax(180px, 10%);

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

      div {
         overflow: auto;
         padding: 2.5rem 2rem 2rem;
      }

      table {
         margin: 0;
         width: 970px;
         min-width: 970px;

         tr {
            grid-template-columns:
               minmax(250px, 40%) minmax(150px, 15%) minmax(70px, 10%)
               minmax(250px, 20%) minmax(250px, 20%);
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

const UserList = () => {
   const dispatch = useDispatch();
   const [popup, setPopup] = useState([false, "", []]);

   const productList = useSelector((state) => state.productList);
   const { error, loading, reviews } = productList;

   useEffect(() => {
      dispatch(listReviews());
   }, [dispatch]);

   return (
      <>
         {error && <Message variant="error" context={error} />}
         {loading ? (
            <Loading />
         ) : (
            <>
               <StyledUserList>
                  {popup[0] && (
                     <Popup>
                        <div>
                           <span onClick={() => setPopup([false, "", []])}>
                              <i className="fa-solid fa-x"></i>
                           </span>
                           <div>
                              <h3>{popup[1]}</h3>
                              <table>
                                 <thead>
                                    <tr>
                                       <th>
                                          <span>ID opinii</span>
                                       </th>
                                       <th>
                                          <span>Autor</span>
                                       </th>
                                       <th>
                                          <span>Ocena</span>
                                       </th>
                                       <th>
                                          <span>Treść</span>
                                       </th>
                                       <th>
                                          <span>Data dodania</span>
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {popup[2]?.map((item) => (
                                       <tr key={item._id}>
                                          <td>{item._id}</td>
                                          <td>{item.name}</td>
                                          <td>{item.rating}</td>
                                          <td>{item.comment}</td>
                                          <td>{item.createdAt}</td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </Popup>
                  )}
                  <h2>Lista opinii:</h2>
                  <table>
                     <thead>
                        <tr>
                           <th>
                              <span>ID produktu</span>
                           </th>
                           <th>
                              <span>Nazwa produktu</span>
                           </th>
                           <th>
                              <span>Ocena</span>
                           </th>
                           <th>
                              <span>Opinie</span>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {reviews?.map((item) => (
                           <tr key={item._id}>
                              <td>
                                 <Link to={`/products/${item._id}`}>
                                    {item._id}
                                 </Link>
                              </td>
                              <td>{item.name}</td>
                              <td>{Number(item.rating).toFixed(1)}</td>
                              <td>
                                 <Button
                                    onClick={() =>
                                       setPopup([true, item.name, item.reviews])
                                    }
                                 >
                                    Pokaż opinie
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </StyledUserList>
            </>
         )}
      </>
   );
};

export default UserList;
