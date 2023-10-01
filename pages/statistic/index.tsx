import { Meta } from 'components/Meta'
import StatisticOut from 'components/statistic/StatisticOut'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import IDataSet from 'types/IDataSet'
import { api } from 'utils/api'
import { dataAnalysis } from 'utils/dataAnalysis/dataAnalysis'
import { getMessages } from 'utils/getMessages'

const statistic = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [usersData, setUsersData] = useState({}) as any
  const data = router.query as unknown as IDataSet
  let userA: any, userB: any

  const getUserInfo = async (data: IDataSet) => {
    userA = await api.call('users.getFullUser', {
      id: { _: 'inputUserSelf' },
    })
    userB = await api.call('users.getFullUser', {
      id: {
        _: 'inputUser',
        user_id: data.user_id as string,
        access_hash: data.access_hash as string,
      },
    })
  }
  const getUsersData = async () => {
    getUserInfo(data)
    const { userInfoA, userInfoB } = await dataAnalysis(await getMessages(data))
    setUsersData({ userInfoA, userInfoB, userA, userB })
    setIsLoading(false)
  }

  useEffect(() => {
    getUsersData()
  }, [data])
  return (
    <>
      {isLoading ? (
        <div className='w-full h-screen flex flex-col items-center justify-center text-2xl'>
          <Meta title='Загрузка' />
          <div className='m-2'>
            <div>Сообщений</div>
            <div id='message-count'>100 из 1000</div>
          </div>
          <div className='w-11/12 h-5 bg-[#262659] rounded-xl'>
            <div
              className='h-5 bg-[#5050fa] transition-all rounded-xl'
              id='loading'
            />
          </div>
          <div className='m-2' id='wait-time'>
            Примерное время ожидания 5 мин
          </div>
        </div>
      ) : (
        <StatisticOut userData={usersData} />
      )}
    </>
  )
}

export default statistic
