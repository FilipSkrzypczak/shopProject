import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";
import Orders from "./Orders";
import Account from "./Account";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import Col from "../../shared/Col";
import Row from "../../shared/Row";
import Dashboard from "./Dashboard";
// import { listMyOrders } from "../../Redux/Actions/OrderActions";

const StyledProfile = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem;
`;

const Menu = styled.div`
   ${(props) => props.theme.filled}
   padding: 1rem;

   @media (min-width: ${(props) => props.theme.responsive.md}) {
      padding: 1rem 0;
   }

   i {
      margin-right: 0.75rem;
      width: 30px;
   }

   a {
      padding: 1rem;
      width: 100%;
   }

   ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
         transition: 0.3s;
         a {
            border: 1px solid transparent;
         }

         &[data-active="true"] {
            a {
               background-color: ${(props) => props.theme.colors.second};
               color: #fff;
            }
         }

         &:hover a {
            border: 1px solid ${(props) => props.theme.colors.second};
         }
      }

      @media (min-width: ${(props) => props.theme.responsive.sm}) {
         display: flex;
         flex-wrap: wrap;

         li {
            width: 50%;
         }
      }

      @media (min-width: ${(props) => props.theme.responsive.md}) {
         display: block;

         li {
            width: auto;
         }
      }
   }
`;

const CurrentComponent = ({ panel, user, address }) => {
   switch (panel) {
      case "orders":
         return <Orders />;

      case "account":
         return <Account user={user} />;

      case "dashboard":
         return <Dashboard address={address} />;

      case "reviews":
         return <Reviews />;

      default:
         return <Dashboard />;
   }
};

const Profile = () => {
   const location = useLocation();

   const currentPanel = location.search.split("?")[1];

   // const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.user);
   const { userInfo, address } = userLogin;
   // const orderListMy = useSelector((state) => state.orderListMy);
   // const { loading, error, orders } = orderListMy;

   // useEffect(() => {
   //    dispatch(listMyOrders());
   // }, [dispatch]);

   return (
      <Section>
         <Wrapper>
            <Row wrapMd="nowrap">
               <Col md="3">
                  <Menu>
                     <ul className="list-unstyled m-0 d-flex d-sm-block flex-wrap">
                        <li
                           data-active={
                              currentPanel === "dashboard" || !currentPanel
                           }
                        >
                           <h3>
                              <Link to="/profile?dashboard" replace>
                                 <i className="fa-solid fa-house-user"></i>
                                 Panel
                              </Link>
                           </h3>
                        </li>
                        <li data-active={currentPanel === "account"}>
                           <h3>
                              <Link to="/profile?account" replace>
                                 <i className="fa-solid fa-address-card"></i>
                                 Profil
                              </Link>
                           </h3>
                        </li>
                        <li data-active={currentPanel === "orders"}>
                           <h3>
                              <Link to="/profile?orders" replace>
                                 <i className="fa-solid fa-bag-shopping"></i>
                                 Zamówienia
                              </Link>
                           </h3>
                        </li>
                        <li data-active={currentPanel === "reviews"}>
                           <h3>
                              <Link to="/profile?reviews" replace>
                                 <i className="fa-solid fa-star"></i>
                                 Opinie
                              </Link>
                           </h3>
                        </li>
                     </ul>
                  </Menu>
               </Col>
               <Col grow="1" span="auto" ovrf="hidden">
                  <StyledProfile>
                     <CurrentComponent
                        panel={currentPanel}
                        user={userInfo}
                        address={address}
                     />
                  </StyledProfile>
               </Col>
            </Row>
         </Wrapper>
      </Section>
   );
};

export default Profile;
