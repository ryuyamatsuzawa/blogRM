import Link from 'next/link'

export const LoginForm = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}  id="loginForm">
    <div className="loginContainer">
    <h2>ログイン画面</h2>
    <div className="loginFormGroup">
    <label>
      <span>ユーザーネーム:</span>
      <input type="text" name="name" required />
    </label>
    </div>
    <div className="loginFormGroup">
    <label>
      <span>パスワード:</span>
      <input type="password" name="password" required />
    </label>
    </div>
    {!isLogin && (
      <div className="loginFormGroup">
      <label>
        <span>パスワード確認:</span>
        <input type="password" name="rpassword" required />
      </label>
      </div>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href="/adminPage/userForm">
            <a>新規アカウントを登録</a>
          </Link>
          <button type="submit">ログイン</button>
        </>
      ) : (
        <>
          <Link href="/loginPage/login">
            <a>既にアカウントを持っています</a>
          </Link>
          <button type="submit">登録</button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  </form>
)