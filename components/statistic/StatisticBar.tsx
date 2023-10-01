import { useEffect, useRef } from 'react'
interface props {
  title: string
  userA: number
  userB: number
}
const StatisticBar = ({ title, userA, userB }: props) => {
  const userRefA = useRef(null)
  const userRefB = useRef(null)

  useEffect(() => {
    ;(userRefA.current as any).style.width = `${
      (+userA * 100) / (+userA + +userB)
    }%`
    ;(userRefB.current as any).style.width = `${
      (+userB * 100) / (+userA + +userB)
    }%`
    ;(userRefA.current as any).textContent = `${(
      (+userA * 100) /
      (+userA + +userB)
    ).toFixed(0)}%`
    ;(userRefB.current as any).textContent = `${(
      (+userB * 100) /
      (+userA + +userB)
    ).toFixed(0)}%`
  }, [userRefA, userRefB])
  return (
    <div className='w-4/5 h-fit bg-[#212121] border-4 border-[#2D2D2D] p-3 mt-8'>
      <div className='text-3xl flex justify-between mb-3'>
        <span>{title}</span>
        <span>
          {' '}
          {userA + userB} | <span className='text-[#FA5050]'>{userA} </span>-
          <span className='text-[#5050FA]'> {userB}</span>
        </span>
      </div>
      <div className='flex w-full h-[20px] bg-[#1e1ec6] items-center'>
        <div
          className={`h-[20px] bg-[#c81e1e] flex items-center justify-end pr-2 text-[#FA5050]`}
          ref={userRefA}
        />
        <div ref={userRefB} className='flex items-center ml-2 text-[#5050FA]' />
      </div>
    </div>
  )
}

export default StatisticBar
