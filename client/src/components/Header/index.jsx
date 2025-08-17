import React, { useEffect } from "react";
import styled from "styled-components";
import Wrapper from "../../shared/Wrapper";
import Logo from "./Logo";
import Search from "./Search";
import Cart from "./Cart";
import Account from "./Account";
import Menu from "./Menu";
import Contact from "./Contact";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../Redux/Actions/ProductActions";

const StyledHeader = styled.header`
   ${(props) => props.theme.filled};
   padding: 1rem 0;

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      padding-bottom: 0;
   }
`;

const Content = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 0.8rem;
   position: relative;

   @media (min-width: ${(props) => props.theme.responsive.lg}) {
      margin-bottom: 1rem;
   }

   i {
      font-size: 1.3rem;
   }

   small {
      display: block;
   }
`;

const Header = () => {
   const dispatch = useDispatch();

   const categoryList = useSelector((state) => state.categoryList);
   const { loading, error, categories } = categoryList;

   useEffect(() => {
      dispatch(listCategory());
   }, [dispatch]);

   return (
      <StyledHeader>
         <Wrapper>
            <Content>
               <Logo />
               <Search />
               <Contact />
               <Account />
               <Cart />
            </Content>
            <Menu categories={categories} />
         </Wrapper>
      </StyledHeader>
   );
};

export default Header;
