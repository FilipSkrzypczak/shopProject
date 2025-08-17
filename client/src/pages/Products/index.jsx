import React from "react";
import { useParams } from "react-router";
import SingeProduct from "../../components/Product";
import ProductList from "../../components/Products";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";

const Products = () => {
   const params = useParams();

   return (
      <Section>
         <Wrapper>{params.id ? <SingeProduct /> : <ProductList />}</Wrapper>
      </Section>
   );
};

export default Products;
