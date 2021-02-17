import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="col-md-2">
      <ul>
        <li><div className="sidebar_item"><Link to={'/'}>全ての投稿一覧</Link></div></li>
        <li><div className="sidebar_item" ><Link to={'/create'}>新しい投稿を作る</Link></div></li>
      </ul>
    </nav>
  );
}

export default Navigation;