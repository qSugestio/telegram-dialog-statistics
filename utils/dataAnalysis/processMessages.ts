export const processMessages = (
  messages: any,
  userInfoA: any,
  userInfoB: any
) => {
  messages.forEach((message: any) => {
    if (message.message === undefined || typeof message.message === 'object')
      return
    message.message.split(' ').map((word: string) => {
      if (word !== '') {
        message.from_id === undefined
          ? (userInfoB.wordsArray = [
              ...userInfoB.wordsArray,
              word.toLowerCase(),
            ])
          : (userInfoA.wordsArray = [
              ...userInfoA.wordsArray,
              word.toLowerCase(),
            ])
      }
    })
  })
}
