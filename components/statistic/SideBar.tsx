import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from 'utils/api'
import SideBarNav from './SideBarNav'

const SideBar = ({
  children,
  category,
}: {
  children: React.JSX.Element
  category: string
}) => {
  const router = useRouter()

  return (
    <>
      <div className='flex h-screen'>
        <div className='w-[330px] h-screen bg-[#181818] flex flex-col justify-between fixed'>
          <nav className='text-2xl ml-14 mt-10'>
            <ul>
              <div className='mb-8 text-[#29295c] ml-[18px]'>Статистика</div>
              <SideBarNav
                title='Сообщений'
                url='messages'
                category={category}
              />
              <SideBarNav title='Слов' url='words' category={category} />
              <SideBarNav title='Эмоджи' url='emoji' category={category} />
              <SideBarNav title='Стикеров' url='stickers' category={category} />
              <SideBarNav title='Реакций' url='reactions' category={category} />
              <SideBarNav title='Иное' url='other' category={category} />
            </ul>
          </nav>
          <nav className='text-2xl ml-14 mt-10'>
            <ul>
              <li className='mb-4'>
                <Link href='/'>
                  <div className='border-l-[10px] border-[#181818] hover:border-[#29295c] pl-2 transition-shadow'>
                    <div>Выбрать другого</div>
                    <div>пользователя</div>
                  </div>
                </Link>
              </li>
              <li className='mb-8'>
                <Link
                  href=''
                  className='border-l-[10px] border-[#181818] hover:border-[#29295c] pl-2 transition-shadow'
                  onClick={async () => {
                    router.push('/')
                    await api.call('auth.logOut')
                  }}
                >
                  Выйти
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='w-screen h-screen flex flex-col items-center ml-[15%]'>
          {children}
        </div>
      </div>
    </>
  )
}

export default SideBar
