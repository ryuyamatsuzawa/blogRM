import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginStatus, setLoginstatus] = useState('')

  const login = () => {
    Axios.post('http://localhost:4000/login', {
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      if(response.data.messeage){
        setLoginstatus(response.data.message)
      } else {
        setLoginstatus(response.data[0].username)
      }
    });
  };

  // const [details, setDetails] = useState({name: "", email: "", password: ""});

  const history = useHistory();

  // const submitHandler = e => {
  //   e.preventDefault();

  //   LoginForm();
  //   // Login(details);
  // }
  return (
    <form id="login-pages">
      <div className="login-container">
        <h2>Login</h2>
        {/* {(error !== "") ? ( <div className="error">{error}</div> ) : ""} */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name"onChange={e => setUsername(e.target.value)}  value={username} />
        
        </div>       
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}  value={email} />
        
        </div>      
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}  value={password}  /> 
         
        </div>
        {/* <button onClick={() => history.push('/')}>Login</button> */}
        <button onClick={login}>Login</button>

        <h1>{loginStatus}</h1>

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