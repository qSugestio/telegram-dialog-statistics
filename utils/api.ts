import { config } from './config'

const MTProto = require('@mtproto/core/envs/browser')
const { sleep } = require('@mtproto/core/src/utils/common')
export class API {
  public mtproto: any
  static mtproto: any

  constructor() {
    this.mtproto = new MTProto({
      api_id: config.api_id,
      api_hash: config.api_hash,
    })
  }

  async call(method: string, params?: any, options: any = {}): Promise<any> {
    try {
      const result = await this.mtproto.call(method, params, options)

      return result
    } catch (error: any) {
      console.log(`${method} error:`, error)

      const { error_code, error_message } = error
      if (error_code === 420) localStorage.setItem('error', error_message)

      if (error_code === 406) {
        switch (error_message) {
          case 'PHONE_NUMBER_INVALID':
            ;(document.querySelector('input') as HTMLInputElement).value = ''
            ;(document.querySelector('input') as HTMLInputElement).placeholder =
              ''
            ;(document.querySelector('input') as HTMLInputElement).disabled =
              true
            ;(
              document.querySelector('#login-button') as HTMLInputElement
            ).disabled = true
            ;(
              document.querySelector('#text') as HTMLInputElement
            ).textContent = `Номер телефона недействителен Повторите попытку позднее`
            break
        }
      }
      if (error_code === 400) {
        switch (error_message) {
          case 'PHONE_CODE_EMPTY':
            ;(
              document.querySelector('#text') as HTMLInputElement
            ).textContent = `Код телефона отсутствует. Повторите попытку позднее`
            break
          case 'PHONE_CODE_EXPIRED':
            ;(
              document.querySelector('#text') as HTMLInputElement
            ).textContent = `Срок действия предоставленного вами кода истёк. Повторите попытку позднее`
            break
          case 'PHONE_CODE_INVALID':
            ;(
              document.querySelector('#text') as HTMLInputElement
            ).textContent = `Предоставленный код недействителен. Повторите попытку позднее`
            break
          case 'PHONE_NUMBER_UNOCCUPIED':
            ;(
              document.querySelector('#text') as HTMLInputElement
            ).textContent = `Номер телефона пока не используется. Повторите попытку позднее`
            break
        }
      }

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1])
        const ms = seconds * 1000

        ;(
          document.querySelector('#text') as HTMLInputElement
        ).textContent = `Слишком много попыток. Повторите попытку входа через ${seconds} секунд`

        await sleep(ms)

        return this.call(method, params, options)
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_')

        const dcId = Number(dcIdAsString)

        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId)
        } else {
          Object.assign(options, { dcId })
        }

        return this.call(method, params, options)
      }

      if (error_code === 500) {
        switch (error_message) {
          case 'AUTH_RESTART':
            ;(document.querySelector('input') as HTMLInputElement).value = ''
            ;(document.querySelector('input') as HTMLInputElement).placeholder =
              ''
            ;(document.querySelector('input') as HTMLInputElement).disabled =
              true
            ;(
              document.querySelector('#login-button') as HTMLInputElement
            ).disabled = true
            ;(
              document.querySelector('#text') as HTMLInputElement
            ).textContent = `Обновите страницу и повторите попытку входа`
            break
          case 'SIGN_IN_FAILED':
            ;(
              document.querySelector('#text') as HTMLInputElement
            ).textContent = `Ошибка при входе в систему. Повторите попытку позднее`
            break
        }
      }
      return Promise.reject(error)
    }
  }
}

export const api = new API()
