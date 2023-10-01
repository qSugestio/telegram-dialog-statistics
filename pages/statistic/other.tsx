import { Context } from 'components/Context'
import { Meta } from 'components/Meta'
import { SkeletonStatisticOut } from 'components/skeleton/SkeletonStatisticOut'
import SideBar from 'components/statistic/SideBar'
import StatisticBar from 'components/statistic/StatisticBar'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
const other = () => {
  const router = useRouter()
  const { data, setData } = useContext(Context)
  useEffect(() => {
    if (Object.keys(data).length === 0) router.push('/')
  }, [])

  return Object.keys(data).length === 0 ? (
    <SkeletonStatisticOut />
  ) : (
    <SideBar category='other'>
      <>
        <Meta title='Иная Статистика' />
        <StatisticBar
          title='Голосовых'
          userA={data.userData.userInfoA.media.documentsArray.voices.length}
          userB={data.userData.userInfoB.media.documentsArray.voices.length}
        />
        <StatisticBar
          title='Длительность Голосовых (в секундах)'
          userA={data.userData.userInfoA.media.documentsArray.voices.reduce(
            (acc, obj) => acc + obj.document.attributes[0].duration,
            0
          )}
          userB={data.userData.userInfoB.media.documentsArray.voices.reduce(
            (acc, obj) => acc + obj.document.attributes[0].duration,
            0
          )}
        />
        <StatisticBar
          title='Фотографий'
          userA={data.userData.userInfoA.media.photosArray.length}
          userB={data.userData.userInfoB.media.photosArray.length}
        />
        <StatisticBar
          title='Видеозаписей'
          userA={
            data.userData.userInfoA.media.documentsArray.videosArray.length
          }
          userB={
            data.userData.userInfoB.media.documentsArray.videosArray.length
          }
        />
      </>
    </SideBar>
  )
}

export default other
