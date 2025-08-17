import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Col from "../../shared/Col";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";
import Product from "../../shared/Product";
import Row from "../../shared/Row";

const StyledList = styled.div`
   h2 {
      margin: 0 0.5rem 1.5rem;
      font-size: 1.2rem;
      opacity: 0.8;
      /* text-align: center; */
      font-family: "Kanit";
      width: 100%;
   }
`;

const Side = styled.div`
   ${(props) => props.theme.filled}
   margin: 0 0.25rem;
   padding: 1rem;

   div:first-child {
      font-weight: 600;
      opacity: 0.75;
      margin-bottom: 0.2rem;
   }

   ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
         margin-bottom: 0.5rem;
      }
   }

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      margin: 0;
      /* padding: 1rem 0.5rem; */
   }
`;

const ActiveLi = styled.li`
   position: relative;
   font-weight: ${(props) => props.isActive && 600};
   padding-left: ${(props) => props.isActive && "1rem"};

   &::before {
      content: "\\276F";
      font-size: 0.8rem;
      position: absolute;
      left: 0px;
      top: 1px;
      display: ${(props) => (props.isActive ? "block" : "none")};
   }
`;

const Sort = styled.div`
   ${(props) => props.theme.filled}
   padding: .5rem .75rem;
   position: relative;

   &:before {
      content: "Sortowanie";
      display: block;
      font-size: 0.6rem;
      position: absolute;
      opacity: 1;
      top: 3px;
      left: 1rem;
      background-color: #fff;
      padding: 0 0.3rem;
      pointer-events: none;
      transition: all 0.3s;
   }

   select {
      border: 1px solid #aaa;
      color: #aaa;
      outline: none;
      background: transparent;
      border-radius: 0;
      margin: 0;
      display: inline-block;
      padding: 0.2rem 0.5rem;
      font-size: 14px;
      color: #222;
   }
`;

const ProductList = () => {
   const dispatch = useDispatch();
   const location = useLocation();

   const [sort, setSort] = useState("default");
   const [sortedProducts, setSortedProducts] = useState(null);

   const category = location.search
      ? decodeURIComponent(location.search.split("?")[1])
      : undefined;

   const productList = useSelector((state) => state.productList);
   const { loading, error, products } = productList;

   const categoryList = useSelector((state) => state.categoryList);
   const { categories } = categoryList;

   useEffect(() => {
      category
         ? dispatch(listProduct("", "", category))
         : dispatch(listProduct());
   }, [dispatch, category]);

   useEffect(() => {
      const sortProducts = () => {
         let sorted = [...products];

         switch (sort) {
            case "popular":
               sorted.sort(
                  (a, b) =>
                     b.reviews.length + b.rating - (a.reviews.length + a.rating)
               );
               break;

            case "priceLow":
               sorted.sort((a, b) => a.price - b.price);
               break;

            case "priceHigh":
               sorted.sort((a, b) => b.price - a.price);
               break;

            default:
               break;
         }

         setSortedProducts(sorted);
      };

      products && sortProducts();
   }, [sort, products]);

   return (
      <StyledList>
         <h2>{category ? category : "Lista produktów"}</h2>
         <Row wrapMd="nowrap">
            <Col md="3" lg="4">
               <Side>
                  <div>Kategorie</div>
                  <ul>
                     {!categoryList.loading &&
                        categories?.map((c) => (
                           <ActiveLi isActive={c.name === category} key={c._id}>
                              <Link to={`/products?${c.name}`}>{c.name}</Link>
                           </ActiveLi>
                        ))}
                  </ul>
               </Side>
            </Col>
            <Col grow="1" span="auto">
               {loading ? (
                  <Loading />
               ) : (
                  <Row>
                     <Col>
                        <Sort>
                           <select onChange={(e) => setSort(e.target.value)}>
                              <option value="default">Domyślnie</option>
                              <option value="popular">Najpopualrniejsze</option>
                              <option value="priceLow">Cena: rosnąco</option>
                              <option value="priceHigh">Cena: malejąco</option>
                           </select>
                        </Sort>
                     </Col>
                     {sortedProducts?.length > 0 ? (
                        sortedProducts?.map((item) => {
                           return (
                              <Col xsm="2" lg="3" key={item._id}>
                                 <Product key={item._id} item={item} />
                              </Col>
                           );
                        })
                     ) : (
                        <Col>
                           <Message
                              variant="error"
                              context="Nie znaleziono produktów"
                           />
                        </Col>
                     )}
                  </Row>
               )}
            </Col>
         </Row>
      </StyledList>
   );
};

export default ProductList;
