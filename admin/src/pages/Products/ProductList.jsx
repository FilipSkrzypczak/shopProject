import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteProduct, listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";

const StyledProductList = styled.div`
   overflow: auto;

   h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 1rem;
   }

   table {
      width: 650px;
      min-width: 650px;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      display: block;

      @media (min-width: ${(props) => props.theme.responsive.md}) {
         width: 750px;
         min-width: 750px;
      }

      * {
         display: block;
      }

      small {
         margin-left: 0.2rem;
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

            td:last-child {
               padding: 0.4rem;
               justify-content: space-between;

               a {
                  * {
                     color: ${(props) => props.theme.colors.second};
                  }
               }
            }
         }
      }

      tr {
         display: grid;
         text-align: left;
         border-bottom: 1px solid #222;

         grid-template-columns:
            minmax(150px, 45%) minmax(90px, 15%) minmax(110px, 15%)
            minmax(110px, 15%) minmax(55px, 10%);

         @media (min-width: ${(props) => props.theme.responsive.md}) {
            grid-template-columns:
               minmax(200px, 45%) minmax(110px, 15%) minmax(110px, 15%)
               minmax(110px, 15%) minmax(75px, 10%);
         }

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

const Info = styled.div`
   max-width: 350px;
`;

const ProductList = () => {
   const dispatch = useDispatch();

   const [success, setSuccess] = useState(false);

   const productList = useSelector((state) => state.productList);
   const { error, loading, products } = productList;

   useEffect(() => {
      dispatch(listProduct());
   }, [dispatch]);

   const handleDelete = (e, id) => {
      e.preventDefault();

      window.confirm("Czy napewno chcesz usunąć ten produkt?") &&
         dispatch(deleteProduct(id)).then((response) => {
            if (response) {
               setSuccess(true);
               setTimeout(() => {
                  setSuccess(false);
               }, 3000);
            }
         });
   };

   return (
      <>
         <Info>
            {success && <Message isFixed={true} context="Produkt usunięty" />}
            {error && <Message variant="error" context={error} />}
         </Info>
         {loading ? (
            <Loading />
         ) : (
            <StyledProductList>
               <h2>Lista produktów:</h2>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <span>Produkt</span>
                        </th>
                        <th>
                           <span>Dostępne</span>
                        </th>
                        <th>
                           <span>Zamówienia</span>
                        </th>
                        <th>
                           <span>Sprzedaż</span>
                        </th>
                        <th>
                           <span>Opcje</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {products?.map((item) => (
                        <tr key={item._id}>
                           <td>
                              {item.name} {item.isActive}
                           </td>
                           <td>{item.countInStock}</td>
                           <td>6</td>
                           <td>
                              0 <small>zł</small>
                           </td>
                           <td>
                              <Link to={`/products/${item._id}`}>
                                 <button>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                 </button>
                              </Link>
                              <button
                                 disabled={loading}
                                 onClick={(e) => handleDelete(e, item._id)}
                              >
                                 <i className="fa-solid fa-trash"></i>
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </StyledProductList>
         )}
      </>
   );
};

export default ProductList;
