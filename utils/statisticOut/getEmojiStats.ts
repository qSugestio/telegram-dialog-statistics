import IUserData from 'types/IUserData'

export const getEmojiStats = (userData: IUserData) => {
  const userEmojiSetA = new Set()
  const userEmojiSetB = new Set()

  const userEmojiA: any = {}
  const userEmojiB: any = {}

  userData.userInfoA.media.emojiArray.map((emoji: any) =>
    userEmojiSetA.add(emoji.message[0])
  )
  for (let i = 0; i < userData.userInfoA.media.emojiArray.length; i++) {
    if (userEmojiSetA.has(userData.userInfoA.media.emojiArray[i].message[0]))
      if (
        userEmojiA[userData.userInfoA.media.emojiArray[i].message[0]] ===
        undefined
      ) {
        userEmojiA[userData.userInfoA.media.emojiArray[i].message[0]] = 1
      } else {
        userEmojiA[userData.userInfoA.media.emojiArray[i].message[0]]++
      }
  }
  userData.userInfoB.media.emojiArray.map((emoji: any) =>
    userEmojiSetB.add(emoji.message[0])
  )
  for (let i = 0; i < userData.userInfoB.media.emojiArray.length; i++) {
    if (userEmojiSetB.has(userData.userInfoB.media.emojiArray[i].message[0]))
      if (
        userEmojiB[userData.userInfoB.media.emojiArray[i].message[0]] ===
        undefined
      ) {
        userEmojiB[userData.userInfoB.media.emojiArray[i].message[0]] = 1
      } else {
        userEmojiB[userData.userInfoB.media.emojiArray[i].message[0]]++
      }
  }
  return { userEmojiA, userEmojiB }
}
