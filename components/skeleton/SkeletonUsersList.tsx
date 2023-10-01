export const SkeletonUsersList = () => {
  return (
    <>
      <div className='w-1/4 min-w-[300px] min-h-[260px] max-h-[1000px] bg-[#202020] border-4 border-[#2E2E61] rounded-[35px] flex flex-col items-center overflow-y-auto animate-pulse'>
        <div className='w-full h-[10%] min-h-[70px] border-b-4 border-[#2E2E61] flex items-center justify-center'>
          <div className='h-6 w-1/2 bg-[#2E2E61]'></div>
        </div>
        <div className='w-fit'>
          <div className='flex text-3xl w-full mb-2 mt-2 p-4 pl-8 pr-8 rounded-[35px]'>
            <div className='w-[120px] h-[120px] bg-[#2E2E61] rounded-full'></div>
            <div className='flex flex-col self-center ml-4'>
              <div className='w-[120px] h-8 bg-[#2E2E61] mb-4'></div>
              <div className='w-[120px] h-8 bg-[#2E2E61]'></div>
            </div>
          </div>
          <div className='flex text-3xl w-full mb-2 mt-2 p-4 pl-8 pr-8 rounded-[35px]'>
            <div className='w-[120px] h-[120px] bg-[#2E2E61] rounded-full'></div>
            <div className='flex flex-col self-center ml-4'>
              <div className='w-[120px] h-8 bg-[#2E2E61] mb-4'></div>
              <div className='w-[120px] h-8 bg-[#2E2E61]'></div>
            </div>
          </div>
          <div className='flex text-3xl w-full mb-2 mt-2 p-4 pl-8 pr-8 rounded-[35px]'>
            <div className='w-[120px] h-[120px] bg-[#2E2E61] rounded-full'></div>
            <div className='flex flex-col self-center ml-4'>
              <div className='w-[120px] h-8 bg-[#2E2E61] mb-4'></div>
              <div className='w-[120px] h-8 bg-[#2E2E61]'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
