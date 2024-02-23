import IDataSet from 'types/IDataSet'
import { api } from './api'

export const getMessages = async (dataset: IDataSet) => {
  const dialogs: any = await new Promise(async resolve => {
    const LIMIT_COUNT = 100
    let messagesLength = 100
    const dialogs = []
    let offset = 0

    do {
      try {
        const { messages, count } = await api.call('messages.getHistory', {
          peer: {
            _: 'inputPeerUser',
            user_id: dataset.user_id,
            access_hash: dataset.access_hash,
          },
          add_offset: offset,
          limit: LIMIT_COUNT,
        })

        if (document.querySelector('#loading') !== null) {
          ;(document.querySelector('#loading') as HTMLElement).style.width = `${
            (dialogs.length * 100) / count
          }%`
        }

        if (document.querySelector('#wait-time') !== null) {
          ;(
            document.querySelector('#wait-time') as HTMLElement
          ).textContent = `Примерное время ожидания ${(
            (count - dialogs.length) /
            100
          ).toFixed(0)} сек`
        }

        if (document.querySelector('#message-count') !== null) {
          ;(
            document.querySelector('#message-count') as HTMLElement
          ).textContent = `${dialogs.length} из ${count}`
        }

        dialogs.push(...messages)
        offset += LIMIT_COUNT

        if (+count > 2900)
          await new Promise(resolve => setTimeout(resolve, 800))
        messagesLength = messages.length

        if (messagesLength !== LIMIT_COUNT) {
          if (document.querySelector('#loading') !== null) {
            ;(document.querySelector('#loading') as HTMLElement).style.width =
              '100%'
          }
          if (document.querySelector('#wait-time') !== null) {
            ;(
              document.querySelector('#wait-time') as HTMLElement
            ).textContent = `Примерное ожидание 0 сек`
          }
          if (document.querySelector('#message-count') !== null) {
            ;(
              document.querySelector('#message-count') as HTMLElement
            ).textContent = `${dialogs.length} из ${count}`
          }
        }
      } catch (errorMessage) {
        const error = localStorage.getItem('error')

        const timeout = error !== null && Number(error.match(/\d+$/))
        await new Promise(resolve => setTimeout(resolve, (+timeout + 3) * 1000))
      }
    } while (messagesLength == LIMIT_COUNT)

    resolve(dialogs)
  })
  return dialogs
}
