import IUserData from 'types/IUserData'

export const getTimeStats = async (userData: IUserData) => {
  const userTimeA: any = []
  const userTimeB: any = []

  userData.userInfoA.messagesArray.map(message =>
    userTimeA.push(new Date(message.date * 1000))
  )
  userData.userInfoB.messagesArray.map(message =>
    userTimeB.push(new Date(message.date * 1000))
  )

  function timeStats(dateArray: any) {
    const timeArray: any = {
      hourStats: [],
      dateStats: [],
      monthStats: [],
      yearStats: [],
      messageCountTimeline: [],
      messageCountByWeekday: [],
    }
    for (const time of dateArray) {
      timeArray.hourStats.push(time.getHours())
      timeArray.dateStats.push(time.getDate())
      timeArray.monthStats.push(time.getMonth())
      timeArray.yearStats.push(time.getFullYear())
      timeArray.messageCountByWeekday.push(time.getDay())
      timeArray.messageCountTimeline.push({
        month: time.getMonth() + 1,
        year: time.getFullYear(),
      })
    }

    const counts: any = {
      hourStats: [],
      dateStats: {},
      monthStats: {},
      yearStats: {},
      messageCountTimeline: [],
      messageCountByWeekday: [],
    }
    for (let i = 0; i <= 23; i++) {
      counts.hourStats[i] = 0
    }
    for (let i = 1; i <= 31; i++) {
      counts.dateStats[i] = 0
    }
    for (let i = 1; i <= 12; i++) {
      counts.monthStats[i] = 0
    }
    for (let i = 0; i <= 6; i++) {
      counts.messageCountByWeekday[i] = 0
    }
    for (let i = 0; i < timeArray.hourStats.length; i++) {
      counts.hourStats[timeArray.hourStats[i]]
        ? (counts.hourStats[timeArray.hourStats[i]] += 1)
        : (counts.hourStats[timeArray.hourStats[i]] = 1)
    }
    for (let i = 0; i < timeArray.dateStats.length; i++) {
      counts.dateStats[timeArray.dateStats[i]]
        ? (counts.dateStats[timeArray.dateStats[i]] += 1)
        : (counts.dateStats[timeArray.dateStats[i]] = 1)
    }
    for (let i = 0; i < timeArray.monthStats.length; i++) {
      counts.monthStats[timeArray.monthStats[i] + 1]
        ? (counts.monthStats[timeArray.monthStats[i] + 1] += 1)
        : (counts.monthStats[timeArray.monthStats[i] + 1] = 1)
    }
    for (let i = 0; i < timeArray.yearStats.length; i++) {
      counts.yearStats[timeArray.yearStats[i]]
        ? (counts.yearStats[timeArray.yearStats[i]] += 1)
        : (counts.yearStats[timeArray.yearStats[i]] = 1)
    }
    for (let i = 0; i < timeArray.messageCountByWeekday.length; i++) {
      counts.messageCountByWeekday[timeArray.messageCountByWeekday[i]]
        ? (counts.messageCountByWeekday[
            timeArray.messageCountByWeekday[i]
          ] += 1)
        : (counts.messageCountByWeekday[timeArray.messageCountByWeekday[i]] = 1)
    }

    function compareDatesAndCount(a: any, b: any) {
      if (a.year < b.year) return -1
      else if (a.year > b.year) return 1
      else if (a.month < b.month) return -1
      else if (a.month > b.month) return 1
      else return 0
    }
    timeArray.messageCountTimeline.sort(compareDatesAndCount)
    let messageCountTimelineCounts: any = {}
    timeArray.messageCountTimeline.forEach((obj: any, index: number) => {
      if (index === 0) {
        for (let i = obj.month; i <= 12; i++) {
          messageCountTimelineCounts[i + '-' + obj.year] = 0
          let month = new Date().getMonth()
          if (obj.year < new Date().getFullYear() && i === 12)
            for (let j = 1; j <= month; j++)
              messageCountTimelineCounts[j + '-' + (+obj.year + 1)] = 0
        }
      }
      messageCountTimelineCounts[obj.month + '-' + obj.year] =
        (messageCountTimelineCounts[obj.month + '-' + obj.year] || 0) + 1
    })
    for (const key in messageCountTimelineCounts) {
      counts.messageCountTimeline.push([key, messageCountTimelineCounts[key]])
    }
    return counts
  }
  const userTimeStatA = timeStats(userTimeA)
  const userTimeStatB = timeStats(userTimeB)

  return { userTimeStatA, userTimeStatB }
}
