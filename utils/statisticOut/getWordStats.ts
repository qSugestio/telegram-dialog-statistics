import IUserData from 'types/IUserData'

export const getWordStats = (userData: IUserData) => {
  const userWordsSetA = new Set()
  const userWordsSetB = new Set()

  const userWordsA: any = {}
  const userWordsB: any = {}
  userData.userInfoA.wordsArray.map((word: string) =>
    userWordsSetA.add(word.toLowerCase())
  )
  for (let i = 0; i < userData.userInfoA.wordsArray.length; i++) {
    if (userWordsSetA.has(userData.userInfoA.wordsArray[i]))
      if (userWordsA[userData.userInfoA.wordsArray[i]] === undefined) {
        userWordsA[userData.userInfoA.wordsArray[i]] = 1
      } else {
        userWordsA[userData.userInfoA.wordsArray[i]]++
      }
  }
  userData.userInfoB.wordsArray.map((word: string) =>
    userWordsSetB.add(word.toLowerCase())
  )
  for (let i = 0; i < userData.userInfoB.wordsArray.length; i++) {
    if (userWordsSetB.has(userData.userInfoB.wordsArray[i]))
      if (userWordsB[userData.userInfoB.wordsArray[i]] === undefined) {
        userWordsB[userData.userInfoB.wordsArray[i]] = 1
      } else {
        userWordsB[userData.userInfoB.wordsArray[i]]++
      }
  }
  return { userWordsA, userWordsB, userWordsSetA, userWordsSetB }
}
