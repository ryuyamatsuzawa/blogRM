import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { useDispatch } from "react-redux";
// import { createSlice } from "@reduxjs/toolkit";
// import { login as loginApi, currentUser } from "../components/api/auth";

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


//  // ログイン機能
//  export function login(username, password) {
//   return async function(dispatch) {
//     const user = await loginApi(username, password)
//     // ログイン後にユーザー情報をストアに格納する
//     dispatch(slice.actions.setUser(user));
//   }
// }

function LoginForm( {Login, error} ) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const [details, setDetails] = useState({name: "", email: "", password: ""});

  const history = useHistory();
  // const dispatch = useDispatch();

  // const submit = async () => {
  //   await dispatch(loginApi(details.name, details.email, details.password));
  //   history.push("/");
  // };

  const submitHandler = e => {
    e.preventDefault();

    Login(details);
  }
  return (
    <form onSubmit={submitHandler} id="login-pages">
      <div className="form-inner">
        <h2>Login</h2>
        {(error !== "") ? ( <div className="error">{error}</div> ) : ""}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
        </div>       
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
        </div>      
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
        </div>
        <button onClick={() => history.push('/')}>
          Login
        </button>

         {/* <h1>Login</h1>
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
        <button type="submit">login</button> */}
      </div>
    </form>
  )
}

export default LoginForm;