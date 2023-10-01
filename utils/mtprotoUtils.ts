import { api } from './api'

export async function getUser() {
  try {
    const user = await api.call('users.getFullUser', {
      id: {
        _: 'inputUserSelf',
      },
    })

    return user
  } catch (error) {
    return null
  }
}
export function sendCode(phone: string) {
  return api.call('auth.sendCode', {
    phone_number: phone,
    settings: {
      _: 'codeSettings',
    },
  })
}
export function signIn({
  code,
  phone,
  phone_code_hash,
}: {
  code: string
  phone: string
  phone_code_hash: string
}) {
  return api.call('auth.signIn', {
    phone_code: code,
    phone_number: phone,
    phone_code_hash: phone_code_hash,
  })
}
export function signUp({
  phone,
  phone_code_hash,
}: {
  phone: string
  phone_code_hash: string
}) {
  return api.call('auth.signUp', {
    phone_number: phone,
    phone_code_hash: phone_code_hash,
    first_name: 'MTProto',
    last_name: 'Core',
  })
}
export function getPassword() {
  return api.call('account.getPassword')
}
export function checkPassword({
  srp_id,
  A,
  M1,
}: {
  srp_id: string
  A: string
  M1: string
}) {
  return api.call('auth.checkPassword', {
    password: {
      _: 'inputCheckPasswordSRP',
      srp_id,
      A,
      M1,
    },
  })
}
