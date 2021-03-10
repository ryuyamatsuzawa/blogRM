import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../../lib/hooks'
import { LoginForm } from '../../components/LoginForm'
import Head from 'next/head';
import { LinkForm } from "../../components/LinkForm";

const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    }

    try {
      const res = await fetch('/api/getUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>ログイン画面</title>
      </Head>
      <LinkForm />
      <div className="login">
        <LoginForm isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </>
  )
}

export default Login