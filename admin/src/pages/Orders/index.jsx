import React from "react";
import OrderList from "./OrderList";
import Content from "../../shared/Content";
import { useLocation } from "react-router-dom";
import OrderDetails from "./OrderDetails";

const Orders = () => {
   const location = useLocation();
   const orderId = location.pathname.split("/orders/")[1];

   return (
      <Content>
         {orderId ? (
            <OrderDetails id={orderId} />
         ) : (
            <>
               <OrderList />
            </>
         )}
      </Content>
   );
};

export default Orders;
