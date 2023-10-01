import { useEffect, useRef } from 'react'
type StatisticCategoriesProps = {
  title: string
  userA: string
  userB: string
}
const StatisticCategories = ({
  title,
  userA,
  userB,
}: StatisticCategoriesProps) => {
  const userBarA = useRef(null)
  const userBarB = useRef(null)

  useEffect(() => {
    ;(userBarA.current as any).style.width = `${
      (+userA * 100) / (+userA + +userB)
    }%`
    ;(userBarB.current as any).style.width = `${
      (+userB * 100) / (+userA + +userB)
    }%`
  }, [])

  return (
    <div className='py-2'>
      <div className='flex justify-between w-full'>
        <div className='text-blue-700 text-3xl font-normal'>{title}</div>
        <div>
          <span className='text-white text-3xl font-normal'>
            {+userA + +userB}
          </span>
          <span className='text-white text-3xl font-normal pl-1 pr-1'>-</span>
          <span className='text-red-600 text-3xl font-normal'>{userA}</span>
          <span className='text-white text-3xl font-normal pl-1 pr-1'>/</span>
          <span className='text-blue-600 text-3xl font-normal'>{userB}</span>
        </div>
      </div>
      <div className='flex justify-between w-full items-center'>
        <div className='w-full h-3.5 bg-white rounded-lg rounded-tr-lg rounded-bl-xl rounded-br-xl flex items-end relative mr-1'>
          <div className='w-1/2 h-2 bg-red-600 rounded-bl-lg' ref={userBarA} />
          <div className='w-1/2 h-2 bg-blue-600 rounded-br-lg' ref={userBarB} />
        </div>
        <div className='flex'>
          <span className='text-red-600 text-3xl font-normal'>
            {userA !== '0' && userB !== '0'
              ? ((+userA * 100) / (+userA + +userB)).toFixed(1)
              : '0'}
            %
          </span>
          <span className='text-white text-3xl font-normal pl-1 pr-1'>/</span>
          <span className='text-blue-600 text-3xl font-normal'>
            {userA !== '0' && userB !== '0'
              ? ((+userB * 100) / (+userA + +userB)).toFixed(1)
              : '0'}
            %
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatisticCategories
