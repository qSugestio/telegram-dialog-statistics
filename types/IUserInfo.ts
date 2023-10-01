export default interface IUserInfo {
  messagesArray: Array<any>
  wordsArray: Array<string>
  media: {
    reactionsArray: Array<any>
    emojiArray: Array<any>
    stickersArray: Array<any>
    photosArray: Array<any>
    webPagesArray: Array<any>
    documentsArray: {
      voices: Array<any>
      videosArray: Array<any>
      audiosArray: Array<any>
    }
  }
}
