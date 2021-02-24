import React, { useState } from 'react'
import Axios from 'axios'

export default function Register() {

  const [usernameReq, setUsernameReq] = useState('')
  const [emailReq, setEmailReq] = useState('')
  const [passwordReq, setPasswordReq] = useState('')

  const register = () => {
    Axios.post('http://localhost:4000/register', {
      username: usernameReq,
      email: emailReq,
      password: passwordReq,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <form action="/" method="POST">
    <div className="login-container">
      <h2>ユーザ登録</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" onChange={e => setUsernameReq(e.target.value)} value={usernameReq} />
      </div>
      <div className="form-group">
        <label htmlFor="name">Email:</label>
        <input type="email" name="email" id="email" onChange={e => setEmailReq(e.target.value)} value={emailReq} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" onChange={e => setPasswordReq(e.target.value)} value={passwordReq} />
      </div>
      <button onClick={register}>登録</button>
    </div>
    </form>
  )
}
