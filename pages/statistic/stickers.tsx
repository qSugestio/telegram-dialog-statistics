import { Context } from 'components/Context'
import { Meta } from 'components/Meta'
import { SkeletonStatisticOut } from 'components/skeleton/SkeletonStatisticOut'
import SideBar from 'components/statistic/SideBar'
import StatisticBar from 'components/statistic/StatisticBar'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const stickersStats = () => {
  const router = useRouter()
  const { data, setData } = useContext(Context)
  useEffect(() => {
    if (Object.keys(data).length === 0) router.push('/')
  }, [])

  const [stickersUserA, setStickersUserA] = useState([]) as any
  const [stickersUserB, setStickersUserB] = useState([]) as any

  useEffect(() => {
    if (Object.keys(data).length === 0) return
    const stickersUserA = data.sticker.stickerUserA.sort(
      (a, b) => b[1].count - a[1].count
    )
    const stickersUserB = data.sticker.stickerUserB.sort(
      (a, b) => b[1].count - a[1].count
    )
    setStickersUserA(stickersUserA)
    setStickersUserB(stickersUserB)
  }, [data])

  return Object.keys(data).length === 0 ? (
    <SkeletonStatisticOut />
  ) : (
    <SideBar category='stickers'>
      <>
        <Meta title='Статистика Стикеров' />
        <StatisticBar
          title='Стикеров'
          userA={data.userData.userInfoA.media.stickersArray.length}
          userB={data.userData.userInfoB.media.stickersArray.length}
        />
        <div className='w-4/5 h-fit mt-5 flex justify-between'>
          <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#FA5050] overflow-y-auto overflow-x-clip'>
            <ul className='w-38 h-fit text-lg'>
              {stickersUserA.map((sticker: any) => {
                return (
                  <li
                    key={sticker}
                    className='text-[#FA5050] break-words w-fit flex mb-5 items-center'
                  >
                    <Image
                      src={sticker[1].url}
                      alt='sticker'
                      width={120}
                      height={120}
                    />{' '}
                    - {sticker[1].count}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#5050FA] overflow-y-auto overflow-x-clip'>
            <ul className='w-38 h-fit text-lg'>
              {stickersUserB.map((sticker: any) => {
                return (
                  <li
                    key={sticker}
                    className='text-[#5050FA] break-words w-fit flex mb-5 items-center'
                  >
                    <Image
                      src={sticker[1].url}
                      alt='sticker'
                      width={120}
                      height={120}
                    />{' '}
                    - {sticker[1].count}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </>
    </SideBar>
  )
}

export default stickersStats
