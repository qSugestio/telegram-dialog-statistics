import IUserInfo from 'types/IUserInfo'
import { getMediaStats } from './getMediaStats'
import { getReactionStats } from './getReactionStats'
import { getSmileStats } from './getSmileStats'
import { processMessages } from './processMessages'

export const dataAnalysis = async (messages: any[]) => {
  let userInfoA: IUserInfo = {
    messagesArray: [],
    wordsArray: [],
    media: {
      reactionsArray: [],
      emojiArray: [],
      stickersArray: [],
      photosArray: [],
      webPagesArray: [],
      documentsArray: {
        voices: [],
        videosArray: [],
        audiosArray: [],
      },
    },
  }
  let userInfoB: IUserInfo = {
    messagesArray: [],
    wordsArray: [],
    media: {
      reactionsArray: [],
      emojiArray: [],
      stickersArray: [],
      photosArray: [],
      webPagesArray: [],
      documentsArray: {
        voices: [],
        videosArray: [],
        audiosArray: [],
      },
    },
  }
  await getSmileStats(messages, userInfoA, userInfoB)
  getReactionStats(messages, userInfoA, userInfoB)
  getMediaStats(messages, userInfoA, userInfoB)
  processMessages(messages, userInfoA, userInfoB)

  return { userInfoA, userInfoB }
}
