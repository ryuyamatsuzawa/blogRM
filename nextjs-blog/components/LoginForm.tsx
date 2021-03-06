import Link from 'next/link'

export const LoginForm = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>ユーザーネーム</span>
      <input type="text" name="username" required />
    </label>
    <label>
      <span>パスワード</span>
      <input type="password" name="password" required />
    </label>
    {!isLogin && (
      <label>
        <span>パスワード確認</span>
        <input type="password" name="rpassword" required />
      </label>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href="/signup">
            <a>新規アカウントを登録</a>
          </Link>
          <button type="submit">Login</button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a>既にアカウントを持っています</a>
          </Link>
          <button type="submit">Signup</button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}
  </form>
)