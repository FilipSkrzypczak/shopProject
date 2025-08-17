import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
   createCategory,
   getCategory,
   updateCategory,
} from "../../Redux/Actions/ProductActions";
import Button from "../../shared/Button";
import Message from "../../shared/Message";
import Loading from "../../shared/Loading";
import { useLocation, useNavigate } from "react-router";

const StyledNewCategory = styled.div`
   & > div {
      max-width: 350px;
   }

   h2 {
      margin-bottom: 1.5rem;
      font-size: 1rem;
      font-weight: 600;
   }

   form {
      width: 100%;
      max-width: 350px;
      label {
         display: block;
         margin-bottom: 1.5rem;
         position: relative;

         input:not([type="checkbox"]),
         textarea {
            width: 100%;
            border: 1px solid ${(props) => props.theme.colors.main};
            padding: 0.5rem;
            outline: none;
            display: block;
         }

         textarea {
            min-height: 100px;
            font-size: smaller;
         }

         & > span {
            display: block;
            font-size: small;
            position: absolute;
            opacity: 1;
            top: -10px;
            left: 5px;
            background-color: #fff;
            padding: 0 0.5rem;
            pointer-events: none;
            transition: all 0.3s;
         }
      }
   }
`;

const Back = styled.button`
   padding: 0;
   margin: 0 0 1rem;
   font-weight: bolder;
   font-size: smaller;
`;

const initialData = {
   name: "",
   permalink: "",
   desc: "",
};

const NewCategory = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const [categoryData, setCategoryData] = useState(initialData);
   const [success, setSuccess] = useState(false);

   const dispatch = useDispatch();

   const categoryId = location.pathname.split("/categories")[1];

   const categoryDetails = useSelector((state) => state.categoryDetails);
   const { loading, error, category } = categoryDetails;

   useEffect(() => {
      category &&
         categoryId &&
         setCategoryData({
            name: category.name,
            permalink: category.permalink,
            desc: category.desc,
         });
   }, [category, categoryId]);

   useEffect(() => {
      categoryId && dispatch(getCategory(categoryId));
   }, [dispatch, categoryId]);

   const handleSubmit = (e) => {
      e.preventDefault();

      category && categoryId
         ? dispatch(updateCategory(categoryId, categoryData)).then(
              (response) => {
                 if (response) {
                    setSuccess(true);
                    setCategoryData(initialData);
                    setTimeout(() => {
                       setSuccess(false);
                    }, 3000);
                 }
              }
           )
         : dispatch(createCategory(categoryData)).then((response) => {
              if (response) {
                 setSuccess(true);
                 setCategoryData(initialData);
                 setTimeout(() => {
                    setSuccess(false);
                 }, 3000);
              }
           });
   };

   return (
      <StyledNewCategory>
         <Back onClick={() => navigate("/categories")}>
            <i className="fa-solid fa-arrow-left-long"></i> Powrót
         </Back>
         {success && (
            <Message
               isFixed={true}
               variant="success"
               context={categoryId ? "Kategoria zapisana" : "Kategoria dodana"}
            />
         )}
         {error && <Message variant="error" context={error} />}
         <h2>Dodaj kategorię:</h2>
         {loading ? (
            <Loading />
         ) : (
            <form onSubmit={handleSubmit}>
               <label>
                  <input
                     type="text"
                     placeholder="Nazwa kategorii"
                     value={categoryData.name}
                     onInput={(e) =>
                        setCategoryData({
                           ...categoryData,
                           name: e.target.value,
                        })
                     }
                     required
                  />
                  <span>Nazwa</span>
               </label>
               <label>
                  <input
                     type="text"
                     value={categoryData.permalink}
                     onInput={(e) =>
                        setCategoryData({
                           ...categoryData,
                           permalink: e.target.value,
                        })
                     }
                     placeholder="Ścieżka kategorii"
                     required
                  />
                  <span>Ścieżka</span>
               </label>
               <label>
                  <textarea
                     value={categoryData.desc}
                     onInput={(e) =>
                        setCategoryData({
                           ...categoryData,
                           desc: e.target.value,
                        })
                     }
                     placeholder="Opis kategorii"
                  />
                  <span>Opis</span>
               </label>
               <Button disabled={loading || error}>
                  {category && categoryId
                     ? "Zapisz kategorię"
                     : "Dodaj kategorię"}
               </Button>
            </form>
         )}
      </StyledNewCategory>
   );
};

export default NewCategory;
