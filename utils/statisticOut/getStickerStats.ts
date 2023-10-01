import IUserData from 'types/IUserData'
import { api } from 'utils/api'

export const getStickerStats = async (userData: IUserData) => {
  const { userStickerA, userStickerB }: any = await new Promise(
    async resolve => {
      const userStickerSetA = new Set()
      const userStickerSetB = new Set()

      const userStickerA: any = {}
      const userStickerB: any = {}

      userData.userInfoA.media.stickersArray.map((sticker: any) =>
        userStickerSetA.add(sticker.media.document.id)
      )
      for (let i = 0; i < userData.userInfoA.media.stickersArray.length; i++) {
        if (
          userStickerSetA.has(
            userData.userInfoA.media.stickersArray[i].media.document.id
          )
        )
          if (
            userStickerA[
              userData.userInfoA.media.stickersArray[i].media.document.id
            ] === undefined
          ) {
            userStickerA[
              userData.userInfoA.media.stickersArray[i].media.document.id
            ] = 1
          } else {
            userStickerA[
              userData.userInfoA.media.stickersArray[i].media.document.id
            ]++
          }
      }

      userData.userInfoB.media.stickersArray.map((sticker: any) =>
        userStickerSetB.add(sticker.media.document.id)
      )
      for (let i = 0; i < userData.userInfoB.media.stickersArray.length; i++) {
        if (
          userStickerSetB.has(
            userData.userInfoB.media.stickersArray[i].media.document.id
          )
        )
          if (
            userStickerB[
              userData.userInfoB.media.stickersArray[i].media.document.id
            ] === undefined
          ) {
            userStickerB[
              userData.userInfoB.media.stickersArray[i].media.document.id
            ] = 1
          } else {
            userStickerB[
              userData.userInfoB.media.stickersArray[i].media.document.id
            ]++
          }
      }

      for (const sticker of userData.userInfoA.media.stickersArray) {
        const stickerData = await api.call('upload.getFile', {
          location: {
            _: 'inputDocumentFileLocation',
            id: sticker.media.document.id,
            access_hash: sticker.media.document.access_hash,
            file_reference: sticker.media.document.file_reference,
            thumb_size:
              sticker.media.document.thumbs[
                sticker.media.document.thumbs.length - 1
              ].type,
          },
          precise: true,
          limit: 320 * 320,
          offset: 0,
        })
        const stickerUint = new Uint8Array(stickerData.bytes)
        const stickerBlob = new Blob([stickerUint], { type: 'image/jpeg' })
        const stickerURL = URL.createObjectURL(stickerBlob)
        if (userStickerA[sticker.media.document.id].url === undefined) {
          userStickerA[sticker.media.document.id] = {
            count: userStickerA[sticker.media.document.id],
            url: stickerURL,
          }
        }
      }
      for (const sticker of userData.userInfoB.media.stickersArray) {
        const stickerData = await api.call('upload.getFile', {
          location: {
            _: 'inputDocumentFileLocation',
            id: sticker.media.document.id,
            access_hash: sticker.media.document.access_hash,
            file_reference: sticker.media.document.file_reference,
            thumb_size:
              sticker.media.document.thumbs[
                sticker.media.document.thumbs.length - 1
              ].type,
          },
          precise: true,
          limit: 320 * 320,
          offset: 0,
        })
        const stickerUint = new Uint8Array(stickerData.bytes)
        const stickerBlob = new Blob([stickerUint], { type: 'image/jpeg' })
        const stickerURL = URL.createObjectURL(stickerBlob)
        if (userStickerB[sticker.media.document.id].url === undefined) {
          userStickerB[sticker.media.document.id] = {
            count: userStickerB[sticker.media.document.id],
            url: stickerURL,
          }
        }
      }
      resolve({ userStickerA, userStickerB })
    }
  )
  return { userStickerA, userStickerB }
}
