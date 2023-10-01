import { Context } from 'components/Context'
import { Meta } from 'components/Meta'
import { SkeletonStatisticOut } from 'components/skeleton/SkeletonStatisticOut'
import SideBar from 'components/statistic/SideBar'
import StatisticBar from 'components/statistic/StatisticBar'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const reactionsStats = () => {
  const router = useRouter()
  const { data, setData } = useContext(Context)
  const [reactionList, setReactionList] = useState() as any
  useEffect(() => {
    if (Object.keys(data).length === 0) router.push('/')
  }, [])

  useEffect(() => {
    if (Object.keys(data).length === 0) return

    const reactions = { userA: {}, userB: {} } as any
    for (
      let i = 0;
      i < data.userData.userInfoA.media.reactionsArray.length;
      i++
    ) {
      if (
        reactions.userA[
          data.userData.userInfoA.media.reactionsArray[i].reaction.emoticon
        ]
      ) {
        reactions.userA[
          data.userData.userInfoA.media.reactionsArray[i].reaction.emoticon
        ]++
      } else {
        reactions.userA[
          data.userData.userInfoA.media.reactionsArray[i].reaction.emoticon
        ] = 1
      }
    }
    for (
      let i = 0;
      i < data.userData.userInfoB.media.reactionsArray.length;
      i++
    ) {
      if (
        reactions.userB[
          data.userData.userInfoB.media.reactionsArray[i].reaction.emoticon
        ]
      ) {
        reactions.userB[
          data.userData.userInfoB.media.reactionsArray[i].reaction.emoticon
        ]++
      } else {
        reactions.userB[
          data.userData.userInfoB.media.reactionsArray[i].reaction.emoticon
        ] = 1
      }
    }
    setReactionList(reactions)
  }, [data])

  return Object.keys(data).length === 0 || reactionList === undefined ? (
    <SkeletonStatisticOut />
  ) : (
    <SideBar category='reactions'>
      <>
        <Meta title='Статистика Реакций' />
        <StatisticBar
          title='Реакций'
          userA={data.userData.userInfoA.media.reactionsArray.length}
          userB={data.userData.userInfoB.media.reactionsArray.length}
        />
        <div className='w-4/5 h-fit mt-5 flex justify-between'>
          <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#FA5050] overflow-y-auto overflow-x-clip'>
            <ul className='w-32 h-fit text-lg'>
              {Object.entries(reactionList.userA)
                .sort((a: any, b: any) => b[1] - a[1])
                .map((reaction: any) => {
                  return (
                    <li
                      key={reaction}
                      className='text-[#FA5050] break-words w-fit'
                    >
                      {reaction[0]} - {reaction[1]}
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#5050FA] overflow-y-auto overflow-x-clip'>
            <ul className='w-32 h-fit text-lg'>
              {Object.entries(reactionList.userB)
                .sort((a: any, b: any) => b[1] - a[1])
                .map((reaction: any) => {
                  return (
                    <li
                      key={reaction}
                      className='text-[#5050FA] break-words w-fit'
                    >
                      {reaction[0]} - {reaction[1]}
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

export default reactionsStats
