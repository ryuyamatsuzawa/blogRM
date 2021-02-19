import React, { useState } from 'react';
import LoginForm from './LoginForm';
// import Router from './Router';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi, currentUser } from "../components/api/auth";


  // const initialState = {
  //   user: null, // ユーザー情報の格納場所
  // };
  
  // const slice = createSlice({
  //   name: "auth",
  //   initialState,
  //   reducers: {
  //     setUser: (state, action) => {
  //       return Object.assign({}, state, { user: action.payload });
  //     }
  //   }
  // });
  
  // export default slice.reducer;
  
  // 認証済みか確認するセレクター
  //  export const isAuthSelector = state => state.auth.user !== null;
  
  //ログイン機能
    // export function login(username, password) {
    // return async function(dispatch) {
    //   const user = await loginApi(username, password)
    //   // ログイン後にユーザー情報をストアに格納する
    //   dispatch(slice.actions.setUser(user));
    // }
  // }

//   export function setCurrentUser() {
//     return async function(dispatch) {
//       try {
//         const user = await currentUser();
//         dispatch(slice.actions.setUser(user));
//       } catch(err) {
//          // 未認証の場合は 403 などのエラーが発生する想定だが、
//       // 初期状態でログインしていないことは異常ではないので
//       // 特にハンドリングはしない
//     }
//   }
// }

  function Login() {

  const adminUser = {
    name: "admin",
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const history = useHistory();
  // const dispatch = useDispatch();

  // const submit = async () => {
  //   await dispatch(loginApi(username, password));
  //   history.push("/");
  // };


  const Login = details => {
    console.log(details);

    if (details.name === adminUser.name && details.email === adminUser.email && details.password === adminUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("Details do not match!");
      setError("Details do not match!")
    }
  }

  const Logout = () => {
    console.log("Logout");
    setUser({ name: "", email: "" });
  }

  return (
    <div className="App" id='login-page'>
      
      {(user.email !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (      
          <LoginForm Login={Login} error={error} />
        )}

        {/* <h1>Login</h1>
      <form onSubmit={submit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form> */}
    </div>
  );
}

export default Login;
