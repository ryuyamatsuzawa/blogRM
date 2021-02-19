// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";
// import  isAuthSelector  from "../components/store/auth";

// function PrivateRoute(props) {
//   const isAuth = useSelector(isAuthSelector);

//   // 渡された props をそのまま Route に設定する
//   return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
// }

// export default PrivateRoute;