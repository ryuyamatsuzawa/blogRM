import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { createSlice } from "@reduxjs/toolkit";
import Router from './Router';

const initialState = {
  user: null, // ユーザー情報の格納場所
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload });
    }
  }
});

// export default slice.reducer;

// 認証済みか確認するセレクター
export const isAuthSelector = state => state.auth.user !== null;

// ログイン機能
export function login(username, password) {
  return async function(dispatch) {
    const user = await login(username, password)
    // ログイン後にユーザー情報をストアに格納する
    dispatch(slice.actions.setUser(user));
  }
}

function Login() {

  const adminUser = {
    name: "admin",
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

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
    <div className="App">
      {(user.email !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
          <LoginForm Login={Login} error={error} />
        )}
    </div>
  );
}

export default Login;
