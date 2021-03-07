import Local from 'passport-local'
import { findUser, validatePassword } from './user'

export const localStrategy = new Local.Strategy(function (
  name,
  password,
  done
) {
  findUser({ name })
    .then((user) => {
      if (user && validatePassword(user, password)) {
        done(null, user)
      } else {
        done(new Error('ユーザネームとパスワードが一致しません'))
      }
    })
    .catch((error) => {
      done(error)
    })
})