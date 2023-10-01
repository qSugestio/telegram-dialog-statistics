import { BarChart } from 'components/BarChart'
import { Context } from 'components/Context'
import { Meta } from 'components/Meta'
import { SkeletonStatisticOut } from 'components/skeleton/SkeletonStatisticOut'
import SideBar from 'components/statistic/SideBar'
import StatisticBar from 'components/statistic/StatisticBar'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const messageStats = () => {
  const router = useRouter()
  const { data, setData } = useContext(Context)
  useEffect(() => {
    if (Object.keys(data).length === 0) router.push('/')
  }, [])

  return Object.keys(data).length === 0 ? (
    <SkeletonStatisticOut />
  ) : (
    <SideBar category='messages'>
      <>
        <Meta title='Статистика Сообщений' />
        <StatisticBar
          title='Сообщений'
          userA={data.userData.userInfoA.messagesArray.length}
          userB={data.userData.userInfoB.messagesArray.length}
        />

        <div className='w-4/5 h-fit mt-5'>
          <BarChart
            userNames={[
              data.userData.userA.users[0].first_name,
              data.userData.userB.users[0].first_name,
            ]}
            title='Таймлайн количества сообщений'
            labels={[
              data.time.timeUserA.messageCountTimeline.map(
                (time: any) => time[0]
              ),
            ]}
            datasets={[
              [
                data.time.timeUserA.messageCountTimeline.map(
                  (time: any) => time[1]
                ),
              ],
              [
                data.time.timeUserB.messageCountTimeline.map(
                  (time: any) => time[1]
                ),
              ],
            ]}
          />
          <BarChart
            userNames={[
              data.userData.userA.users[0].first_name,
              data.userData.userB.users[0].first_name,
            ]}
            title='Количество сообщений по дням недели'
            labels={[['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']]}
            datasets={[
              [
                data.time.timeUserA.messageCountByWeekday.map(
                  (time: number) => time
                ),
              ],
              [
                data.time.timeUserB.messageCountByWeekday.map(
                  (time: number) => time
                ),
              ],
            ]}
          />
          <BarChart
            userNames={[
              data.userData.userA.users[0].first_name,
              data.userData.userB.users[0].first_name,
            ]}
            title='Количество сообщений по часам'
            labels={[Object.keys(data.time.timeUserA.hourStats)]}
            datasets={[
              [
                Object.keys(data.time.timeUserA.hourStats).map(
                  (key: any) => data.time.timeUserA.hourStats[key]
                ),
              ],
              [
                Object.keys(data.time.timeUserB.hourStats).map(
                  (key: any) => data.time.timeUserB.hourStats[key]
                ),
              ],
            ]}
          />
          <BarChart
            userNames={[
              data.userData.userA.users[0].first_name,
              data.userData.userB.users[0].first_name,
            ]}
            title='Количество сообщений по дням месяца'
            labels={[Object.keys(data.time.timeUserA.dateStats)]}
            datasets={[
              [
                Object.keys(data.time.timeUserA.dateStats).map(
                  (key: any) => data.time.timeUserA.dateStats[key]
                ),
              ],
              [
                Object.keys(data.time.timeUserB.dateStats).map(
                  (key: any) => data.time.timeUserB.dateStats[key]
                ),
              ],
            ]}
          />
          <BarChart
            userNames={[
              data.userData.userA.users[0].first_name,
              data.userData.userB.users[0].first_name,
            ]}
            title='Количество сообщений по месяцам'
            labels={[Object.keys(data.time.timeUserA.monthStats)]}
            datasets={[
              [
                Object.keys(data.time.timeUserA.monthStats).map(
                  (key: any) => data.time.timeUserA.monthStats[key]
                ),
              ],
              [
                Object.keys(data.time.timeUserB.monthStats).map(
                  (key: any) => data.time.timeUserB.monthStats[key]
                ),
              ],
            ]}
          />
          <BarChart
            userNames={[
              data.userData.userA.users[0].first_name,
              data.userData.userB.users[0].first_name,
            ]}
            title='Количество сообщений по годам'
            labels={[Object.keys(data.time.timeUserA.yearStats)]}
            datasets={[
              [
                Object.keys(data.time.timeUserA.yearStats).map(
                  (key: any) => data.time.timeUserA.yearStats[key]
                ),
              ],
              [
                Object.keys(data.time.timeUserB.yearStats).map(
                  (key: any) => data.time.timeUserB.yearStats[key]
                ),
              ],
            ]}
          />
        </div>
      </>
    </SideBar>
  )
}

export default messageStats
