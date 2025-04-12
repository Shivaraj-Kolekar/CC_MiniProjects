import React from 'react'
import { GraduationCap, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from './components/ui/label'
import { Link } from 'react-router-dom'

function App () {
  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900'>
      <main className='flex flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl'>
              Student Management System
            </h1>
            <p className='mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400'>
              Efficiently manage students, courses, and enrollments with our
              comprehensive platform.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8'>
            <Link to='/courses' className='group'>
              <div className='flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700'>
                <div className='mb-4 rounded-full bg-slate-100 p-3 text-slate-900 dark:bg-slate-800 dark:text-slate-100'>
                  <GraduationCap size={24} />
                </div>
                <h2 className='mb-2 text-xl font-semibold text-slate-900 dark:text-white'>
                  Courses
                </h2>
                <p className='text-center text-sm text-slate-600 dark:text-slate-400'>
                  Manage course offerings, view details, and handle student
                  enrollments.
                </p>
              </div>
            </Link>

            <Link to='/students' className='group'>
              <div className='flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700'>
                <div className='mb-4 rounded-full bg-slate-100 p-3 text-slate-900 dark:bg-slate-800 dark:text-slate-100'>
                  <Users size={24} />
                </div>
                <h2 className='mb-2 text-xl font-semibold text-slate-900 dark:text-white'>
                  Students
                </h2>
                <p className='text-center text-sm text-slate-600 dark:text-slate-400'>
                  View student profiles, track enrollments, and manage student
                  information.
                </p>
              </div>
            </Link>
          </div>

          <div className='flex justify-center space-x-4'>
            <Button asChild size='lg' variant='default'>
              <Link to='/courses'>Browse Courses</Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link to='/students'>View Students</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
