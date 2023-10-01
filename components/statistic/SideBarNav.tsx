import Link from 'next/link'

interface props {
  category: string
  title: string
  url: string
}
const SideBarNav = ({ category, title, url }: props) => {
  return (
    <li className='mb-4 flex'>
      {category === url ? (
        <Link
          href={`/statistic/${url}`}
          className='border-l-[10px] border-[#5050FA] pl-2'
        >
          {title}
        </Link>
      ) : (
        <Link
          href={`/statistic/${url}`}
          className='border-l-[10px] border-[#181818] hover:border-[#29295c] pl-2 transition-shadow'
        >
          {title}
        </Link>
      )}
    </li>
  )
}

export default SideBarNav
