import '../styles/global.css'
// import React from "react";
// import { SWRConfig } from 'swr';
// import PostedUser from '../pages/adminPage/userList';
// import UserDetailForm from '../pages/adminPage/userDetail'

export default function App({ Component, pageProps }) {
  // const [detailUser, setDetailUser] = React.useState(null);
  return (
    // <SWRConfig>
    //   {detailUser ? (
    //     <UserDetailForm
    //     detailUser={detailUser}
    //     setDetailUser={setDetailUser}
    //     />
    //   ) : (
    //     <PostedUser setDetailUser={setDetailUser} />
    //   )}
      <Component {...pageProps} />
    // </SWRConfig>
  )
}