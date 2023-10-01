export const SkeletonStatisticOut = () => {
  return (
    <>
      <div className='flex h-screen animate-pulse'>
        <div className='w-[330px] h-screen bg-[#181818] flex flex-col justify-between fixed'>
          <nav className='text-2xl ml-14 mt-10'>
            <ul>
              <div className='pl-2 transition-shadow mb-8'>
                <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
              </div>
              <div className='pl-2 transition-shadow mb-4'>
                <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
              </div>
              <div className='pl-2 transition-shadow mb-4'>
                <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
              </div>
              <div className='pl-2 transition-shadow mb-4'>
                <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
              </div>
              <div className='pl-2 transition-shadow mb-4'>
                <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
              </div>
              <div className='pl-2 transition-shadow mb-4'>
                <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
              </div>
              <div className='pl-2 transition-shadow mb-4'>
                <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
              </div>
            </ul>
          </nav>
          <nav className='text-2xl ml-14 mt-10'>
            <ul>
              <li className='mb-4'>
                <div className='pl-2 transition-shadow'>
                  <div className='w-[200px] h-[25px] bg-[#2E2E61] mb-2' />
                  <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
                </div>
              </li>
              <li className='mb-8'>
                <div className='pl-2 transition-shadow'>
                  <div className='w-[200px] h-[25px] bg-[#2E2E61]' />
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className='w-screen h-screen flex flex-col items-center ml-[15%]'>
          <div className='w-4/5 h-fit bg-[#212121] border-4 border-[#2D2D2D] p-3 mt-8'>
            <div className='text-3xl flex justify-between mb-3'>
              <span className='w-[150px] h-[25px] bg-[#2E2E61]' />
              <span className='w-[200px] h-[25px] bg-[#2E2E61]' />
            </div>
            <div className='flex w-full h-[20px] bg-[#2E2E61] items-center' />
          </div>
          <div className='w-4/5 h-fit mt-5 flex justify-between'>
            <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#FA5050] overflow-y-auto overflow-x-clip'>
              <ul className='w-full flex flex-col items-center h-fit text-lg pt-4'>
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
              </ul>
            </div>
            <div className='w-[45%] max-w-[45%] flex flex-col items-center h-fit max-h-[800px] bg-[#181818] border-4 border-[#5050FA] text-[#5050FA] overflow-y-auto overflow-x-clip'>
              <ul className='w-full flex flex-col items-center h-fit text-lg pt-4'>
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
                <li className='w-[200px] h-[25px] bg-[#2E2E61] mb-4' />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
