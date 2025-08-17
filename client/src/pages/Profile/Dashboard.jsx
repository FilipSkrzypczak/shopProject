import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { saveAddress } from "../../Redux/Actions/UserActions";
import Button from "../../shared/Button";
import StyledOrder from "../../shared/StyledOrder";
import Message from "../../shared/Message";
import { listUserOrders } from "../../Redux/Actions/OrderActions";
import Status from "../../shared/Status";
import Loading from "../../shared/Loading";

const StyledDashboard = styled.div`
   p {
      margin: 0;
      font-weight: 600;
      margin-bottom: 0.5rem;
   }

   a {
      margin-bottom: 1rem;

      i {
         margin-left: 0.5rem;
      }
   }

   hr {
      margin-bottom: 1rem;
   }
`;

const FormWrapper = styled.div`
   margin-top: 1rem;
   form {
      max-width: 350px;
      label {
         display: block;
         margin-bottom: 1.5rem;
         position: relative;

         a {
            color: #ec0000;
         }

         input[type="checkbox"] {
            margin-right: 0.5rem;
         }

         input:not([type="checkbox"]) {
            width: 100%;
            border: 1px solid ${(props) => props.theme.colors.main};
            padding: 0.5rem;
            outline: none;
         }

         span {
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

const Dashboard = ({ address }) => {
   const [shippingAddress, setShippingAddress] = useState({
      name: "",
      street: "",
      zip: "",
      city: "",
      email: "",
      phone: "",
   });
   const [success, setSuccess] = useState(false);

   const dispatch = useDispatch();

   useEffect(() => {
      address && setShippingAddress(address);
   }, [address]);

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(saveAddress(shippingAddress));
      setSuccess(true);
      setTimeout(() => {
         setSuccess(false);
      }, 2000);
   };

   const orderList = useSelector((state) => state.orderList);
   const { loading, error, orders } = orderList;

   useEffect(() => {
      dispatch(listUserOrders("?last=true"));
   }, [dispatch]);

   return (
      <StyledDashboard>
         <p>Ostatnie zamówienie:</p>
         {error && <Message variant="error" context={error} />}
         {loading ? (
            <Loading />
         ) : (
            !error && (
               <div>
                  {orders?.map((item) => (
                     <StyledOrder key={item._id}>
                        <div>
                           <span>Zamówienie Nr:</span>
                           <b>{item._id}</b>
                        </div>
                        <div>
                           <span>Status:</span>
                           <b>
                              <Status context={item.status.text} />
                           </b>
                        </div>
                        <div>
                           <span>Data zamówienia: </span>
                           <b>{item.createdAt}</b>
                        </div>
                        <div>
                           <span>Kwota zamówienia:</span>
                           <b>{item.totalPrice} zł</b>
                        </div>
                     </StyledOrder>
                  ))}
               </div>
            )
         )}
         <Link to="/profile?orders">
            Zobacz wszystkie zamówienia
            <i className="fa-solid fa-arrow-right"></i>
         </Link>
         <hr />
         <p>Wpisz dane do zamówień:</p>
         <FormWrapper>
            <form onSubmit={handleSubmit}>
               {success && (
                  <Message
                     isFixed={true}
                     variant="success"
                     context="Dane zapisane."
                  />
               )}
               <label>
                  <input
                     required
                     type="text"
                     value={shippingAddress.name}
                     placeholder="Imię i nazwisko lub nazwa firmy"
                     onInput={(e) =>
                        setShippingAddress({
                           ...shippingAddress,
                           name: e.target.value,
                        })
                     }
                  />
                  <span>Imię i nazwisko lub nazwa firm</span>
               </label>
               <label>
                  <input
                     required
                     type="text"
                     placeholder="Ulica i numer"
                     value={shippingAddress.street}
                     onInput={(e) =>
                        setShippingAddress({
                           ...shippingAddress,
                           street: e.target.value,
                        })
                     }
                  />
                  <span>Ulica i numer</span>
               </label>
               <label>
                  <input
                     required
                     type="text"
                     placeholder="Kod pocztowy"
                     value={shippingAddress.zip}
                     onInput={(e) =>
                        setShippingAddress({
                           ...shippingAddress,
                           zip: e.target.value,
                        })
                     }
                  />
                  <span>Kod pocztowy</span>
               </label>
               <label>
                  <input
                     required
                     type="text"
                     placeholder="Miejscowość"
                     value={shippingAddress.city}
                     onInput={(e) =>
                        setShippingAddress({
                           ...shippingAddress,
                           city: e.target.value,
                        })
                     }
                  />
                  <span>Miejscowość</span>
               </label>
               <label>
                  <input
                     required
                     type="email"
                     placeholder="E-mail"
                     value={shippingAddress.email}
                     onInput={(e) =>
                        setShippingAddress({
                           ...shippingAddress,
                           email: e.target.value,
                        })
                     }
                  />
                  <span>E-mail</span>
               </label>
               <label>
                  <input
                     required
                     type="text"
                     placeholder="Telefon"
                     minLength={1}
                     maxLength={9}
                     value={shippingAddress.phone}
                     onInput={(e) =>
                        setShippingAddress({
                           ...shippingAddress,
                           phone: e.target.value,
                        })
                     }
                  />
                  <span>Telefon</span>
               </label>
               <Button>Zapisz dane</Button>
            </form>
         </FormWrapper>
      </StyledDashboard>
   );
};

export default Dashboard;
