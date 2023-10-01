export const getMediaStats = (
  messages: any,
  userInfoA: any,
  userInfoB: any
) => {
  messages.forEach((message: any) => {
    if (message.media !== undefined) {
      switch (message.media._) {
        case 'messageMediaDocument':
          switch (message.media.document.mime_type) {
            case 'video/mp4' || 'video/quicktime':
              if (message.media.document.attributes[1] === undefined) {
                message.from_id === undefined
                  ? (userInfoB.media.documentsArray.voices = [
                      ...userInfoB.media.documentsArray.voices,
                      message.media,
                    ])
                  : (userInfoA.media.documentsArray.voices = [
                      ...userInfoA.media.documentsArray.voices,
                      message.media,
                    ])
              } else {
                message.from_id === undefined
                  ? (userInfoB.media.documentsArray.videosArray = [
                      ...userInfoB.media.documentsArray.videosArray,
                      message.media,
                    ])
                  : (userInfoA.media.documentsArray.videosArray = [
                      ...userInfoA.media.documentsArray.videosArray,
                      message.media,
                    ])
              }
              break
            case 'audio/ogg':
              if ((message.media.document.attributes[0].voices = true)) {
                message.from_id === undefined
                  ? (userInfoB.media.documentsArray.voices = [
                      ...userInfoB.media.documentsArray.voices,
                      message.media,
                    ])
                  : (userInfoA.media.documentsArray.voices = [
                      ...userInfoA.media.documentsArray.voices,
                      message.media,
                    ])
              } else {
                message.from_id === undefined
                  ? (userInfoB.media.documentsArray.audiosArray = [
                      ...userInfoB.media.documentsArray.audiosArray,
                      message.media,
                    ])
                  : (userInfoA.media.documentsArray.audiosArray = [
                      ...userInfoA.media.documentsArray.audiosArray,
                      message.media,
                    ])
              }
              break
          }
          break
        case 'messageMediaPhoto':
          message.from_id === undefined
            ? (userInfoB.media.photosArray = [
                ...userInfoB.media.photosArray,
                message.media,
              ])
            : (userInfoA.media.photosArray = [
                ...userInfoA.media.photosArray,
                message.media,
              ])
          break
        case 'messageMediaWebPage':
          message.from_id === undefined
            ? (userInfoB.media.webPagesArray = [
                ...userInfoB.media.webPagesArray,
                message.media,
              ])
            : (userInfoA.media.webPagesArray = [
                ...userInfoA.media.webPagesArray,
                message.media,
              ])
          break
      }
    }
  })
}
