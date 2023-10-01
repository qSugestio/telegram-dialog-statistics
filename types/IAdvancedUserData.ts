import IUserData from './IUserData'

export default interface IAdvancedUserData {
  userData: IUserData
  emoji: { emojiUserA: any[]; emojiUserB: any[] }
  sticker: { stickerUserA: any[]; stickerUserB: any[] }
  time: {
    timeUserA: {
      dateStats: { [index: number]: number }
      hourStats: number[]
      messageCountByWeekday: number[]
      messageCountTimeline: any[]
      monthStats: { [index: number]: number }
      yearStats: { [index: number]: number }
    }
    timeUserB: {
      dateStats: { [index: number]: number }
      hourStats: number[]
      messageCountByWeekday: number[]
      messageCountTimeline: any[] | number[]
      monthStats: { [index: number]: number }
      yearStats: { [index: number]: number }
    }
  }
  words: {
    wordsUserA: any[]
    wordsUserB: any[]
    uniqueWordsA: any[]
    uniqueWordsB: any
  }
}
