import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
   createProduct,
   getProduct,
   listCategory,
   updateProduct,
} from "../../Redux/Actions/ProductActions";
import Button from "../../shared/Button";
import Message from "../../shared/Message";
import Loading from "../../shared/Loading";
import { useLocation, useNavigate } from "react-router";

const StyledNewProduct = styled.div`
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

         input[type="checkbox"] {
            margin-right: 0.5rem;
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

const Choose = styled.div`
   position: relative;
   margin-bottom: 1.5rem;
   cursor: pointer;

   &:before {
      content: "Kategoria";
      display: block;
      font-size: small;
      position: absolute;
      opacity: 1;
      top: -10px;
      left: 5px;
      background-color: #fff;
      padding: 0 0.5rem;
      pointer-events: none;
      z-index: 3;
   }

   button {
      padding: 0.5rem;
      border: 1px solid #222;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      text-align: left;

      i {
         margin-left: 0.5rem;
      }

      &:focus + div {
         opacity: 1;
         visibility: visible;
      }
   }

   & > div {
      background-color: #fff;
      border: 1px solid #222;
      position: absolute;
      width: 100%;
      z-index: 2;
      top: 100%;
      margin-top: 0.1rem;
      opacity: 0;
      transition: all 0.3s;
      visibility: hidden;
      max-height: 140px;
      overflow: auto;

      label {
         padding: 0.5rem;
         margin: 0;
         cursor: pointer;

         &:hover {
            background-color: #eee;
         }

         input {
            margin-right: 0.5rem;
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
   image: "",
   description: "",
   price: 0,
   countInStock: 0,
   categories: [],
   isActive: false,
};

const NewProduct = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const [productData, setProductData] = useState(initialData);
   const [success, setSuccess] = useState(false);

   const dispatch = useDispatch();

   const productId = location.pathname.split("/products")[1];

   const categoryList = useSelector((state) => state.categoryList);
   const { error, loading, categories } = categoryList;

   const productDetails = useSelector((state) => state.productDetails);

   useEffect(() => {
      productDetails.product &&
         productId &&
         setProductData({
            name: productDetails.product.name,
            image: productDetails.product.image,
            description: productDetails.product.description,
            price: productDetails.product.price,
            countInStock: productDetails.product.countInStock,
            categories: productDetails.product.categories,
            isActive: productDetails.product.isActive,
         });
   }, [productDetails, productId]);

   useEffect(() => {
      productId && dispatch(getProduct(productId));
   }, [dispatch, productId]);

   useEffect(() => {
      dispatch(listCategory());
   }, [dispatch]);

   const addCategory = (value) => {
      const index = productData.categories.findIndex((c) => c === value);
      const newCategory = [...productData.categories, value];
      setProductData({
         ...productData,
         categories:
            index > -1 ? newCategory.filter((c) => c !== value) : newCategory,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      productDetails.product && productId
         ? dispatch(updateProduct(productId, productData)).then((response) => {
              if (response) {
                 setSuccess(true);
                 setProductData(initialData);
                 setTimeout(() => {
                    setSuccess(false);
                 }, 3000);
              }
           })
         : dispatch(createProduct(productData)).then((response) => {
              if (response) {
                 setSuccess(true);
                 setProductData(initialData);
                 setTimeout(() => {
                    setSuccess(false);
                 }, 3000);
              }
           });
   };

   return (
      <StyledNewProduct>
         <Back onClick={() => navigate("/products")}>
            <i className="fa-solid fa-arrow-left-long"></i> Powrót
         </Back>
         {success && (
            <Message
               isFixed={true}
               variant="success"
               context={productId ? "Produkt zapisany" : "Produkt dodany"}
            />
         )}
         {productDetails.error && (
            <Message variant="error" context={productDetails.error} />
         )}
         <h2>Dodaj produkt:</h2>
         {productDetails.loading ? (
            <Loading />
         ) : (
            <form onSubmit={handleSubmit}>
               <label>
                  <input
                     type="text"
                     placeholder="Nazwa produktu"
                     value={productData.name}
                     onInput={(e) =>
                        setProductData({ ...productData, name: e.target.value })
                     }
                     required
                  />
                  <span>Nazwa</span>
               </label>
               <label>
                  <input
                     type="text"
                     value={productData.image}
                     onInput={(e) =>
                        setProductData({
                           ...productData,
                           image: e.target.value,
                        })
                     }
                     placeholder="Adres URL obrazu"
                     required
                  />
                  <span>Obraz</span>
               </label>
               <label>
                  <textarea
                     value={productData.description}
                     onInput={(e) =>
                        setProductData({
                           ...productData,
                           description: e.target.value,
                        })
                     }
                     placeholder="Opis produktu"
                     required
                  />
                  <span>Opis</span>
               </label>
               <Choose>
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                     }}
                  >
                     {productData.categories.length > 0
                        ? productData.categories.join(", ")
                        : "Wybierz kategorie..."}
                     <i className="fa-solid fa-angle-down"></i>
                  </button>
                  <div>
                     {!loading &&
                        !error &&
                        categories.map((item) => (
                           <label key={item._id}>
                              <input
                                 type="checkbox"
                                 value={item.name}
                                 defaultChecked={productData.categories.some(
                                    (c) => c === item.name
                                 )}
                                 onChange={(e) => {
                                    e.target.offsetParent.parentNode.previousElementSibling.focus();
                                    addCategory(e.target.value);
                                 }}
                              />
                              {item.name}
                           </label>
                        ))}
                  </div>
               </Choose>
               <label>
                  <input
                     value={productData.price}
                     onInput={(e) =>
                        setProductData({
                           ...productData,
                           price: isNaN(Number(e.target.value))
                              ? 0
                              : Number(e.target.value),
                        })
                     }
                     type="text"
                     placeholder="Cena"
                     required
                  />
                  <span>Cena</span>
               </label>
               <label>
                  <input
                     value={productData.countInStock}
                     onInput={(e) =>
                        setProductData({
                           ...productData,
                           countInStock: isNaN(Number(e.target.value))
                              ? 0
                              : Number(e.target.value),
                        })
                     }
                     type="text"
                     placeholder="Ilość w magazynie"
                     required
                  />
                  <span>Ilość w magazynie</span>
               </label>
               <label>
                  <input
                     checked={productData.isActive}
                     onChange={(e) =>
                        setProductData({
                           ...productData,
                           isActive: e.target.checked,
                        })
                     }
                     type="checkbox"
                  />
                  Produkt aktywny
               </label>
               <Button
                  disabled={productDetails.loading || productDetails.error}
               >
                  {productDetails.product && productId
                     ? "Zapisz produkt"
                     : "Dodaj produkt"}
               </Button>
            </form>
         )}
      </StyledNewProduct>
   );
};

export default NewProduct;
