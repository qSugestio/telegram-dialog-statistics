export const getReactionStats = (
  messages: any,
  userInfoA: any,
  userInfoB: any
) => {
  messages.forEach((message: any) => {
    if (typeof message.message === 'object') return
    if (message.message !== undefined) {
      message.message = message.message
        .replace(/\b(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\b/g, '')
        .replace(
          /[?\.\\&\[\]|*^乁–_—ㄏ•№,+=!…:;#@/0-9\-$%`"'~\p{Extended_Pictographic}()«»<>{}]/gu,
          ' '
        )
        .replace(/\s+/g, ' ')
    }
    if (message.reactions !== undefined) {
      if (message.reactions.recent_reactions === undefined) return
      if (message.from_id !== undefined) {
        message.reactions.recent_reactions.map((reaction: any) => {
          if (reaction.peer_id.user_id === message.from_id.user_id) {
            userInfoA.media.reactionsArray = [
              ...userInfoA.media.reactionsArray,
              reaction,
            ]
          } else {
            userInfoB.media.reactionsArray = [
              ...userInfoB.media.reactionsArray,
              reaction,
            ]
          }
        })
      } else {
        message.reactions.recent_reactions.map((reaction: any) => {
          if (reaction.peer_id.user_id === message.peer_id.user_id) {
            userInfoB.media.reactionsArray = [
              ...userInfoB.media.reactionsArray,
              reaction,
            ]
          } else {
            userInfoA.media.reactionsArray = [
              ...userInfoA.media.reactionsArray,
              reaction,
            ]
          }
        })
      }
    }
    if (message.message === '' || message.message === ' ') return
    message.from_id === undefined
      ? (userInfoB.messagesArray = [...userInfoB.messagesArray, message])
      : (userInfoA.messagesArray = [...userInfoA.messagesArray, message])
  })
}
