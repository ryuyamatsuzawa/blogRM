import Link from 'next/link'

export const LinkForm = () => (
  <>
   <Link href="/loginPage/login">
      <a>ログイン</a>
    </Link>
    {" "}|{" "}
    <Link href="/">
      <a>HOME</a>
    </Link>
    {" "}|{" "}
    <Link href="/userPage/post/postList">
      <a>ユーザーの投稿編集</a>
    </Link>
    {" "}|{" "}
    <Link href="/userPage/post/postForm">
      <a>投稿する</a>
    </Link>
    {" "}|{" "}
    <Link href="/adminPage/userForm">
      <a>ユーザー作成</a>
    </Link>
    {" "}|{" "}
    <Link href="/adminPage/userList">
      <a>ユーザ一覧</a>
    </Link>
    {" "}|{" "}
  </>
)