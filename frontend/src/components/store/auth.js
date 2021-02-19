// import { createSlice } from "@reduxjs/toolkit";
// import { login as loginApi, currentUser } from "../api/auth";

// const initialState = {
//   user: null,
// };

// const slice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       return Object.assign({}, state, { user: action.payload });
//     }
//   }
// });

// export default slice.reducer;

// export const isAuthSelector = state => state.auth.user !== null;

// export function login(username, password) {
//   return async function(dispatch) {
//     const user = await loginApi(username, password);
//     dispatch(slice.actions.setUser(user));
//   }
// }

// export function setCurrentUser() {
//   return async function(dispatch) {
//     try {
//       const user = await currentUser();
//       dispatch(slice.actions.setUser(user));
//     } catch(err) {
//        // 未認証の場合は 403 などのエラーが発生する想定だが、
//     // 初期状態でログインしていないことは異常ではないので
//     // 特にハンドリングはしない
//   }
// }
// }