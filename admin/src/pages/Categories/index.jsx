import React from "react";
import { Link, useLocation } from "react-router-dom";
import NewCategory from "./NewCategory";
import CategoryList from "./CategoryList";
import Content from "../../shared/Content";
import Button from "../../shared/Button";

const Categories = () => {
   const location = useLocation();
   const addNew =
      location.search.split("?")[1] === "new" ||
      location.pathname.split("/categories")[1].length > 0;

   return (
      <Content>
         {addNew ? (
            <NewCategory />
         ) : (
            <>
               <Link to="?new" replace>
                  <Button>Dodaj nową kategorię +</Button>
               </Link>
               <hr />
               <CategoryList />
            </>
         )}
      </Content>
   );
};

export default Categories;
