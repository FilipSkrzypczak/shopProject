import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Col from "../../shared/Col";
import Row from "../../shared/Row";
import Wrapper from "../../shared/Wrapper";

const StyledFooter = styled.footer`
   background-color: #fff;
   margin-top: 1.5rem;
   /* border-top: 1px solid ${(props) => props.theme.colors.second}; */
`;

const Content = styled.div`
   padding: 1rem 0 2rem;

   i {
      margin-right: 0.5rem;
   }

   p {
      margin: 0.5rem 0 1rem;
      font-weight: 600;
      text-transform: uppercase;
   }

   ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
         margin-bottom: 1rem;
      }
   }
`;

const Logo = styled.div`
   font-size: 1.6rem;
   font-family: "Kanit";
   color: ${(props) => props.theme.colors.second};
   position: relative;
   display: inline-block;
   margin-right: auto;
   font-weight: 500;
`;

const Divider = styled.div`
   height: 1px;
   background-color: ${(props) => props.theme.colors.main};
   opacity: 0.2;
`;

const Bottom = styled.div`
   padding: 1.5rem 0;
   opacity: 0.5;
   font-size: 0.9rem;
   text-align: center;
`;

const Footer = () => {
   return (
      <StyledFooter>
         <Wrapper>
            <Content>
               <Row>
                  <Col sm="3" lg="4">
                     <Logo>
                        <Link to="/">XYZStore</Link>
                     </Logo>
                     {/* <img src="/images/logos.png" alt="logotypy" /> */}
                  </Col>
                  <Col sm="3" lg="4">
                     <p>Informacja</p>
                     <ul>
                        <li>
                           <Link to="/contact">Kontakt</Link>
                        </li>
                        <li>
                           <Link to="/policy?pricelist">Cennik wysyłek</Link>
                        </li>
                        <li>
                           <Link to="/policy">Polityka prywatności</Link>
                        </li>
                        <li>
                           <Link to="/policy?refund">Zwroty i Reklamacje</Link>
                        </li>
                     </ul>
                  </Col>
                  <Col sm="3" lg="4">
                     <p>Kontakt:</p>
                     <div>
                        000-000-000
                     </div>
                     {/* <div>
                        <i className="fa-solid fa-phone"></i> 515 747 829
                     </div>
                     <br />
                     <div>
                        <i className="fa-solid fa-envelope"></i>
                        <a href="mailto:sklep@bf.pl">sklep@bf.pl</a>
                     </div> */}
                  </Col>
               </Row>
            </Content>
         </Wrapper>
         <Divider></Divider>
         <Wrapper>
            <Bottom>&copy; 2022 XYZStore. Wszelkie prawa zastrzeżone</Bottom>
         </Wrapper>
      </StyledFooter>
   );
};

export default Footer;
