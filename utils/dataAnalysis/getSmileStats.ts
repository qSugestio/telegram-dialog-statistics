export const getSmileStats = async (
  messages: any,
  userInfoA: any,
  userInfoB: any
) => {
  return await new Promise(resolve => {
    const smiles = messages.map((message: any) => ({ ...message }))

    smiles
      .filter((dialog: any) => {
        if (dialog.message === undefined) return false
        return dialog.media?.document?.attributes[1]?.alt !== undefined
          ? true
          : dialog.message.match(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g) !== null
          ? true
          : false
      })
      .map((dialog: any) => {
        if (dialog.media?.document?.attributes[1]?.alt !== undefined) {
          dialog.message = [dialog.media.document.attributes[1].alt]

          dialog.from_id === undefined
            ? (userInfoB.media.stickersArray = [
                ...userInfoB.media.stickersArray,
                dialog,
              ])
            : (userInfoA.media.stickersArray = [
                ...userInfoA.media.stickersArray,
                dialog,
              ])
          return dialog
        } else {
          dialog.message = dialog.message
            .match(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g)[0]
            .split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
          dialog.message = dialog.message.filter((str: any) => str !== '')

          dialog.from_id === undefined
            ? (userInfoB.media.emojiArray = [
                ...userInfoB.media.emojiArray,
                dialog,
              ])
            : (userInfoA.media.emojiArray = [
                ...userInfoA.media.emojiArray,
                dialog,
              ])
          return dialog
        }
      })
    return resolve(smiles)
  })
}
