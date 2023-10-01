import { Context } from 'components/Context'
import { SkeletonStatisticOut } from 'components/skeleton/SkeletonStatisticOut'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import IUserData from 'types/IUserData'
import { getEmojiStats } from 'utils/statisticOut/getEmojiStats'
import { getStickerStats } from 'utils/statisticOut/getStickerStats'
import { getTimeStats } from 'utils/statisticOut/getTimeStats'
import { getWordStats } from 'utils/statisticOut/getWordStats'

interface props {
  userData: IUserData
}

const StatisticOut = ({ userData }: props) => {
  const router = useRouter()
  const { data, setData } = useContext(Context)

  const sortEntriesDescending = (entries: any) => {
    return entries.sort((a: any, b: any) => b[1] - a[1])
  }
  useEffect(() => {
    new Promise(async resolve => {
      const { userWordsA, userWordsB, userWordsSetA, userWordsSetB } =
        getWordStats(userData)
      const { userEmojiA, userEmojiB } = getEmojiStats(userData)
      const { userStickerA, userStickerB } = await getStickerStats(userData)
      const { userTimeStatA, userTimeStatB } = await getTimeStats(userData)

      setData({
        userData,
        words: {
          wordsUserA: sortEntriesDescending(Object.entries(userWordsA)),
          wordsUserB: sortEntriesDescending(Object.entries(userWordsB)),
          uniqueWordsA: [...userWordsSetA],
          uniqueWordsB: [...userWordsSetB],
        },
        emoji: {
          emojiUserA: sortEntriesDescending(Object.entries(userEmojiA)),
          emojiUserB: sortEntriesDescending(Object.entries(userEmojiB)),
        },
        sticker: {
          stickerUserA: sortEntriesDescending(Object.entries(userStickerA)),
          stickerUserB: sortEntriesDescending(Object.entries(userStickerB)),
        },
        time: { timeUserA: userTimeStatA, timeUserB: userTimeStatB },
      })

      resolve('')
    })
  }, [])

  useEffect(() => {
    if (Object.keys(data).length === 0) return
    router.push('/statistic/messages')
  }, [data])

  return <SkeletonStatisticOut />
}

export default StatisticOut
