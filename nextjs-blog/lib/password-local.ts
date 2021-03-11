import Local from 'passport-local'
import { findUser, validatePassword } from './user'
import crypto from 'crypto';

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

export function validatePassword(user:any, inputPassword:any) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.password === inputHash
  return passwordsMatch
}