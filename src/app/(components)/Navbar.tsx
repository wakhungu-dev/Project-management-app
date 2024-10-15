import React from 'react'
import { Search, Settings } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-white dark:bg-black  px-4 py-3'>
        Navbar
        {/* search bar */}
        <div className=' flex items-center gap-8'>
            <div className='relative flex h-min w-[200px]'>
                <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark: text-white' />
                <input type='search' placeholder='Search...' className='w-full h-full p-2 pl-8 text-sm bg-gray-100 dark:bg-dark-bg dark:text-white rounded-md focus:outline-none' />
            </div>
        </div>
        {/* icons */}
        <div className='flex items-center gap-4'>
            <div className='flex items-center gap-4'>
                <Link href='/settings'
                className='h-min w-min p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100'>
                    <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
                </Link>
                <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block'>
                    

                </div>
                
            </div>
        </div>
        </div>
  )
}

export default Navbar