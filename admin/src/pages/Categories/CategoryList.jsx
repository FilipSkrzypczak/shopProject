import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
   deleteCategory,
   listCategory,
} from "../../Redux/Actions/ProductActions";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";

const StyledCategoryList = styled.div`
   overflow: auto;
   h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 1rem;
   }

   table {
      width: 350px;
      min-width: 350px;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      display: block;

      @media (min-width: ${(props) => props.theme.responsive.md}) {
         width: 450px;
         min-width: 450px;
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

         grid-template-columns: minmax(150px, 90%) minmax(75px, 10%);

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

const CategoryList = () => {
   const dispatch = useDispatch();

   const [success, setSuccess] = useState(false);

   const categoryList = useSelector((state) => state.categoryList);
   const { error, loading, categories } = categoryList;

   useEffect(() => {
      dispatch(listCategory());
   }, [dispatch]);

   const handleDelete = (e, id) => {
      e.preventDefault();

      window.confirm("Czy napewno chcesz usunąć tę kategorię?") &&
         dispatch(deleteCategory(id)).then((response) => {
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
            {success && <Message isFixed={true} context="Kategoria usunięta" />}
            {error && <Message variant="error" context={error} />}
         </Info>
         {loading ? (
            <Loading />
         ) : (
            <StyledCategoryList>
               <h2>Lista kategorii: </h2>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <span>Kategoria</span>
                        </th>
                        <th>
                           <span>Opcje</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {categories?.map((item) => (
                        <tr key={item._id}>
                           <th>{item.name}</th>
                           <td>
                              <Link to={`/categories/${item._id}`}>
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
            </StyledCategoryList>
         )}
      </>
   );
};

export default CategoryList;
