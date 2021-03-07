import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import { LoginForm } from "../components/LoginForm";
import Head from 'next/head';
import { LinkForm } from "../components/LinkForm";

const Signup = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    }

    if (body.password !== e.currentTarget.password.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/login')
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
        <title>アカウント登録</title>
      </Head>
      <LinkForm />
      <div className="login">
        <LoginForm isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </>
  )
}

export default Signup