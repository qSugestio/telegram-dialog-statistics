export const SkeletonLogin = () => {
  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center justify-center animate-pulse'>
        <div className='text-3xl mb-4 transition-all w-[150px] h-[30px] bg-[#5050FA]' />
        <div className='flex'>
          <input
            type='number'
            className='bg-[#262659] border-4 border-[#5050FA] rounded-l-3xl h-[100px] pr-5 pl-5 text-3xl text-[#5050FA] transition-all'
          />
          <button className='bg-[#262659] border-4 border-l-0 border-[#5050FA] rounded-r-3xl h-[100px] pr-5 pl-5 text-3xl text-[#5050FA] w-[100px]' />
        </div>
      </div>
    </>
  )
}
