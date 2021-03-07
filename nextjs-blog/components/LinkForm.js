import Link from 'next/link'

export const LinkForm = () => (
  <>
    <Link href="/login">
      <a>ログイン</a>
    </Link>
    {" "}|{" "}
    <Link href="/signup">
      <a>新規アカウントを登録</a>
    </Link>
    {" "}|{" "}
    <Link href="/createdPost">
      <a>投稿する</a>
    </Link>
    {" "}|{" "}
    <Link href="/postedPost">
      <a>投稿一覧</a>
    </Link>
    {" "}|{" "}
    <Link href="/createdUser">
      <a>ユーザー作成</a>
    </Link>
    {" "}|{" "}
    <Link href="/postedUser">
      <a>ユーザ一覧</a>
    </Link>
    {" "}|{" "}
  </>
)