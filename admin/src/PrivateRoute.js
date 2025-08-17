import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
   const userLogin = useSelector((state) => state.user);
   const { error, loading, userInfo } = userLogin;

   return (
      <>
         {userInfo && userInfo?.isAdmin ? <Outlet /> : <Navigate to="/login" />}
      </>
   );
};

export default PrivateRouter;
