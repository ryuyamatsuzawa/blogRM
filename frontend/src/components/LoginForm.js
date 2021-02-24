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

  const history = useHistory();


  return (
    <form id="login-pages">
      <div className="login-container">
        <h2>ログイン</h2>
        {/* {(error !== "") ? ( <div className="error">{error}</div> ) : ""} */}
        <div className="form-group">
          <label htmlFor="name">名前:</label>
          <input type="text" name="name" id="name"onChange={e => setUsername(e.target.value)}  value={username} />
        
        </div>       
        <div className="form-group">
          <label htmlFor="name">メールアドレス:</label>
          <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}  value={email} />
        
        </div>      
        <div className="form-group">
          <label htmlFor="password">パスワード:</label>
          <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}  value={password}  /> 
         
        </div>
        <button style={{marginRight: '10px'}}onClick={() => history.push('/')}>ビジターはこちらへ</button>
        <button onClick={login}>ログイン</button>
        {/* <button type="submit">login</button> */}

        <h1>{loginStatus}</h1>

      </div>
    </form>
  )
}

export default LoginForm;