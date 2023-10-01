import { api } from './api'

export const getContacts = async (setUser: any, setUsers: any) => {
  const contacts = await new Promise(async resolve => {
    const { users } = await api.call('contacts.getContacts')
    resolve(users)
  }).then(async (contacts: any) => {
    const fullUsersArray = []
    for (const contact of contacts) {
      const fullUser = await api.call('users.getFullUser', {
        id: {
          _: 'inputUser',
          user_id: contact.id,
          access_hash: contact.access_hash,
        },
      })
      setUser(fullUser)
      fullUsersArray.push(fullUser)
    }
    return fullUsersArray
  })

  const photos: string[] = await new Promise(async resolve => {
    const photos = []
    for (const user of contacts) {
      if (!user.full_user.hasOwnProperty('profile_photo')) continue
      photos.push(
        await api.call('upload.getFile', {
          location: {
            _: 'inputPhotoFileLocation',
            id: user.full_user.profile_photo.id,
            access_hash: user.full_user.profile_photo.access_hash,
            file_reference: user.full_user.profile_photo.file_reference,
            thumb_size: user.full_user.profile_photo.sizes[2].type,
          },
          precise: true,
          limit: 640 * 640,
          offset: 0,
        })
      )
    }
    const photoUrls: any = []
    for (const photo of photos) {
      const photoData = new Uint8Array(photo.bytes)
      const photoBlob = new Blob([photoData], { type: 'image/jpeg' })
      const photoURL = URL.createObjectURL(photoBlob)
      photoUrls.push(photoURL)
    }
    resolve(photoUrls)
  })

  const users = []
  for (let i = 0; i < contacts.length; i++) {
    const { count } = await api.call('messages.getHistory', {
      peer: {
        _: 'inputPeerUser',
        user_id: contacts[i].users[0].id as string,
        access_hash: contacts[i].users[0].access_hash as string,
      },
      add_offset: 0,
      limit: 0,
    })
    if (count === 0) continue
    users.push({ userData: contacts[i], photo: photos[i] })
  }
  setUsers(users)
}
