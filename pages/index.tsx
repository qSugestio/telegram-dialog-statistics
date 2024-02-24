import { Meta } from 'components/Meta'
import { SkeletonLogin } from 'components/skeleton/SkeletonLogin'
import { SkeletonUsersList } from 'components/skeleton/SkeletonUsersList'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { api } from 'utils/api'
import { onTelegramAuth } from 'utils/onTelegramAuth'

const Login = () => {
  const text = useRef(null)
  const input = useRef(null)
  const button = useRef(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const [users, setUsers] = useState<any>()

  const transitionOnPageStatistics = async (event: any) => {
    if (event.target.id === 'user') {
      router.push({ pathname: '/statistic', query: event.target.dataset })
    } else if (event.target.id === 'image') {
      router.push({
        pathname: '/statistic',
        query: event.target.parentNode.dataset,
      })
    } else if (event.target.id === 'name') {
      router.push({
        pathname: '/statistic',
        query: event.target.parentNode.parentNode.dataset,
      })
    }
  }

  useEffect(() => {
    setIsLoading(false)
    onTelegramAuth(setUser, setUsers, text, input, button)
  }, [])

  return isLoading === true ? (
    <SkeletonLogin />
  ) : user === null ? (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <Meta title='Авторизация' />
      <div ref={text} id='text' className='text-3xl mb-4 transition-all'>
        Введите номер телефона
      </div>
      <form className='flex' onSubmit={e => e.preventDefault()}>
        <input
          ref={input}
          type='number'
          placeholder='Номер Телефона'
          className='bg-[#262659] border-4 border-[#5050FA] rounded-l-3xl h-[100px] pr-5 pl-5 text-3xl text-[#5050FA] transition-all'
        />
        <button
          id='login-button'
          ref={button}
          onClick={() => {
            if (input.current === null) return
            const inputElement: any = input.current
            const type: any = inputElement.type
            if (type !== 'password')
              onTelegramAuth(setUser, setUsers, text, input, button)
          }}
          className='bg-[#262659] border-4 border-l-0 border-[#5050FA] rounded-r-3xl h-[100px] pr-5 pl-5 text-3xl text-[#5050FA] transition-all hover:bg-[#5050FA] hover:text-[#FFFF] active:bg-[#262659]'
        >
          LOGIN
        </button>
      </form>
    </div>
  ) : (
    <div className='flex justify-center items-center h-screen'>
      {users === undefined ? (
        <SkeletonUsersList />
      ) : (
        <div className='w-1/5 min-w-[400px] min-h-[300px] max-h-[1000px] bg-[#202020] border-4 border-[#2E2E61] rounded-[35px] flex flex-col items-center overflow-y-auto overflow-x-hidden'>
          <Meta title='Выберите Пользователя' />
          <div className='w-full h-[10%] min-h-[70px] border-b-4 border-[#2E2E61] flex items-center justify-center'>
            <span className='text-2xl'>Выберите пользователя</span>
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            {users.map((el: any) => (
              <div
                key={el.userData.full_user.id}
                id='user'
                data-user_id={el.userData.users[0].id}
                data-access_hash={el.userData.users[0].access_hash}
                onClick={event => transitionOnPageStatistics(event)}
                className='flex text-3xl w-11/12 mb-2 mt-2 p-4 rounded-[35px] border-4 border-[#202020] hover:bg-[#2E2E61] hover:border-[#3F3FAD] transition-all active:scale-[0.9]'
              >
                <Image
                  id='image'
                  src={el.photo !== undefined ? el.photo : ''}
                  width={120}
                  height={120}
                  alt='profile photo'
                  className='rounded-full'
                />
                <div className='flex flex-col self-center ml-4'>
                  <span
                    id='name'
                    className='sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'
                  >
                    {el.userData.users[0].first_name}
                  </span>
                  <span
                    id='name'
                    className='text-[#38388F] sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'
                  >
                    {el.userData.users[0].username}
                  </span>
                </div>
              </div>
            ))}
            <div className='w-full h-[10%] min-h-[70px] border-t-4 flex items-center justify-center border-[#2E2E61]'>
              <button
                className='text-2xl'
                onClick={async () => {
                  await api.call('auth.logOut')
                  router.push('/')
                  router.reload()
                }}
              >
                выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
