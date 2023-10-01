import { api } from './api'
import { getContacts } from './getContacts'
import {
  checkPassword,
  getPassword,
  getUser,
  sendCode,
  signIn,
  signUp,
} from './mtprotoUtils'

export async function onTelegramAuth(
  setUser: any,
  setUsers: any,
  text: any,
  input: any,
  button: any
) {
  const user = await getUser()
  setUser(user)

  if (!user) {
    const getPhone = async () => {
      const phone: string = await new Promise((resolve: any) => {
        button.current.addEventListener('click', (event: any) => {
          if (input.current.value === '') {
            text.current.style.color = '#FA5050'
            input.current.style.borderColor = '#FA5050'
            button.current.style.borderColor = '#FA5050'
            return
          }
          if (
            input.current.value.match(
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim
            ) === null ||
            input.current.value.match(
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim
            )[0].length < 11
          ) {
            text.current.style.color = '#FA5050'
            input.current.style.borderColor = '#FA5050'
            button.current.style.borderColor = '#FA5050'
            return
          }
          text.current.style.color = 'white'
          input.current.style.borderColor = '#5050FA'
          button.current.style.borderColor = '#5050FA'
          resolve(input.current.value)
          event.stopPropagation()
        })
      })
      return phone
    }

    const phone = await getPhone()
    const { phone_code_hash } = await sendCode(phone)

    input.current.value = ''
    input.current.type = 'password'
    text.current.textContent = 'Введите пришедший код'
    input.current.placeholder = 'Код'

    const getCode = async () => {
      const code: string = await new Promise((resolve: any) => {
        button.current.addEventListener('click', (event: any) => {
          if (input.current.value === '') {
            text.current.style.color = '#FA5050'
            input.current.style.borderColor = '#FA5050'
            button.current.style.borderColor = '#FA5050'
            button.current.style.color = '#FA5050'
            return
          } else {
            text.current.style.color = 'white'
            input.current.style.borderColor = '#5050FA'
            button.current.style.borderColor = '#5050FA'
            button.current.style.color = '#5050FA'
            resolve(input.current.value)
            event.stopPropagation()
          }
        })
      })
      return code
    }
    const code = await getCode()

    try {
      const signInResult = await signIn({
        code,
        phone,
        phone_code_hash,
      })

      if (signInResult._ === 'auth.authorizationSignUpRequired') {
        await signUp({
          phone,
          phone_code_hash,
        })
      }
      text.current.textContent = 'Загрузка...'
      input.current.placeholder = ''
      input.current.value = ''
      getContacts(setUser, setUsers)
    } catch (error: any) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        console.log(`error:`, error)
        return
      }

      // 2FA
      text.current.textContent = 'Введите Код-пароль'
      input.current.placeholder = 'Код-пароль'
      input.current.value = ''
      const password: string = await new Promise((resolve: any) => {
        button.current.addEventListener('click', (event: any) => {
          if (input.current.value === '') {
            text.current.style.color = '#FA5050'
            input.current.style.borderColor = '#FA5050'
            button.current.style.borderColor = '#FA5050'
            button.current.style.color = '#FA5050'
            return
          } else {
            text.current.style.color = 'white'
            input.current.style.borderColor = '#5050FA'
            button.current.style.borderColor = '#5050FA'
            button.current.style.color = '#5050FA'
            resolve(input.current.value)
            event.stopPropagation()
          }
        })
      })
      text.current.textContent = 'Загрузка...'
      input.current.placeholder = ''
      input.current.value = ''

      const { srp_id, current_algo, srp_B } = await getPassword()
      const { g, p, salt1, salt2 } = current_algo
      const { A, M1 } = await api.mtproto.crypto.getSRPParams({
        g,
        p,
        salt1,
        salt2,
        gB: srp_B,
        password,
      })
      const checkPasswordResult = await checkPassword({ srp_id, A, M1 })
      getContacts(setUser, setUsers)
    }
  } else {
    getContacts(setUser, setUsers)
  }
}
