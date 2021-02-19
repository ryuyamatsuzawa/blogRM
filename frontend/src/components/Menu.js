import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav>
    <Link to="/">ホーム</Link>
    {" "}|{" "}
    <Link to={'/login'}>ログイン</Link>
    {" "}|{" "}
    <Link to={'/mypage'}>マイページ</Link>
    {" "}|{" "}
    <Link to={'/create'}>新しい投稿を作る</Link>
  </nav>
  )
}