import type { NextPage } from 'next'

const error: NextPage = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <h1 className='text-[#dc2626] text-3xl'>Ошибка 404</h1>
      <p className='text-2xl'>Такой страницы не существует</p>
    </div>
  )
}

export default error
