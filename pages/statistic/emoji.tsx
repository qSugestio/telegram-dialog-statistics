import { Context } from 'components/Context'
import { Meta } from 'components/Meta'
import { SkeletonStatisticOut } from 'components/skeleton/SkeletonStatisticOut'
import SideBar from 'components/statistic/SideBar'
import StatisticBar from 'components/statistic/StatisticBar'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const emojiStats = () => {
  const router = useRouter()
  const { data, setData } = useContext(Context)
  useEffect(() => {
    if (Object.keys(data).length === 0) router.push('/')
  }, [])

  return Object.keys(data).length === 0 ? (
    <SkeletonStatisticOut />
  ) : (
    <SideBar category='emoji'>
      <>
        <Meta title='Статистика Емоджи' />
        <StatisticBar
          title='Эмоджи'
          userA={data.userData.userInfoA.media.emojiArray.length}
          userB={data.userData.userInfoB.media.emojiArray.length}
        />
        <div className='w-4/5 h-fit mt-5 flex justify-between'>
          <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#FA5050] overflow-y-auto overflow-x-clip'>
            <ul className='w-32 h-fit text-lg'>
              {data.emoji.emojiUserA.map((emoji: any) => {
                return (
                  <li key={emoji} className='text-[#FA5050] break-words w-fit'>
                    {emoji[0]} - {emoji[1]}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#5050FA] overflow-y-auto overflow-x-clip'>
            <ul className='w-32 h-fit text-lg'>
              {data.emoji.emojiUserB.map((emoji: any) => {
                return (
                  <li key={emoji} className='text-[#5050FA] break-words w-fit'>
                    {emoji[0]} - {emoji[1]}
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

export default emojiStats
