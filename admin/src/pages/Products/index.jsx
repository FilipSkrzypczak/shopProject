import React from "react";
import { Link, useLocation } from "react-router-dom";
import NewProduct from "./NewProduct";
import ProductList from "./ProductList";
import Content from "../../shared/Content";
import Button from "../../shared/Button";

const Products = () => {
   const location = useLocation();
   const addNew =
      location.search.split("?")[1] === "new" ||
      location.pathname.split("/products")[1].length > 0;

   return (
      <Content>
         {addNew ? (
            <NewProduct />
         ) : (
            <>
               <Link to="?new" replace>
                  <Button>Dodaj nowy produkt +</Button>
               </Link>
               <hr />
               <ProductList />
            </>
         )}
      </Content>
   );
};

export default Products;
