import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function Header () {
  return (
    <div className='bg-slate-800  text-center flex flex-row justify-between px-20 font-medium text-lg py-4 w-full text-white'>
      <Link to='/'>
        <h1 className='text-3xl font-semibold'>Rapid LMS</h1>
      </Link>
      <div className='space-x-2'>
        <Link to='/students'>
          <Button size={'lg'}>Students</Button>
        </Link>
        <Link to='/courses'>
          <Button size='lg'>Courses</Button>
        </Link>
      </div>
    </div>
  )
}

export default Header
