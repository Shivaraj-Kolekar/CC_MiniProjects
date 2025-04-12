import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Link } from 'react-router-dom'
import { BookOpen, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
function CoursesPage () {
  const [courses, setCourses] = useState([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const {
    register: enrollRegister,
    handleSubmit: handleEnrollSubmit,
    reset: resetEnroll
  } = useForm()

  const fetchcourses = () => {
    axios
      .get('http://127.0.0.1:8000/courses-data')
      .then(res => {
        setCourses(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        console.log(err?.message)
      })
  }

  const addCourse = async data => {
    await axios
      .post('http://127.0.0.1:8000/courses', { ...data })
      .then(res => {
        toast.success('Course added successfully')
        fetchcourses()
        reset()
      })
      .catch(err => {
        console.log(err)
        toast.error('Failed to add course')
      })
  }

  const enroll = async data => {
    await axios
      .post('http://127.0.0.1:8000/enrollments', {
        ...data
      })
      .then(res => {
        toast.success(`Student enrolled into course`)
        resetEnroll()
      })
      .catch(err => {
        console.log(err)
        toast.error('Failed to enroll')
      })
  }

  useEffect(() => {
    fetchcourses()
  }, [])

  return (
    <div className='min-h-screen px-20 py-8 bg-slate-50 dark:bg-slate-950'>
      {/* <header className='sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center space-x-2'>
            <BookOpen className='h-6 w-6 text-slate-900 dark:text-white' />
            <h1 className='text-xl font-bold text-slate-900 dark:text-white'>
              Courses
            </h1>
          </div>

          <div className='flex items-center space-x-4'>
            <Link href='/students'>
              <Button variant='outline' size='sm'>
                Students
              </Button>
            </Link>
            <Link href='/'>
              <Button variant='outline' size='sm'>
                Home
              </Button>
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <form
                  className='space-y-4 pt-4'
                  onSubmit={handleSubmit(addCourse)}
                >
                  <div className='space-y-2'>
                    <Label htmlFor='course_id'>Course ID</Label>
                    <Input
                      id='course_id'
                      placeholder='e.g., C104'
                      {...register('course_id')}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='title'>Course Title</Label>
                    <Input
                      id='title'
                      placeholder='e.g., Advanced Web Development'
                      {...register('title')}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='description'>Course Description</Label>
                    <Textarea
                      id='description'
                      placeholder='Provide a brief description of the course'
                      {...register('description')}
                      rows={3}
                    />
                  </div>

                  <Button type='submit' className='w-full'>
                    Add Course
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header> */}
      <div className='flex flex-row justify-between items-center'>
        <div className='flex text-4xl items-center flex-row gap-2'>
          <BookOpen size={44}></BookOpen>
          <h1>Courses</h1>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <form className='space-y-4 pt-4' onSubmit={handleSubmit(addCourse)}>
              <div className='space-y-2'>
                <Label htmlFor='course_id'>Course ID</Label>
                <Input
                  id='course_id'
                  placeholder='e.g., C104'
                  {...register('course_id')}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='title'>Course Title</Label>
                <Input
                  id='title'
                  placeholder='e.g., Advanced Web Development'
                  {...register('title')}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='description'>Course Description</Label>
                <Textarea
                  id='description'
                  placeholder='Provide a brief description of the course'
                  {...register('description')}
                  rows={3}
                />
              </div>

              <Button type='submit' className='w-full'>
                Add Course
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {courses.map(course => (
            <Card
              key={course.course_id}
              className='overflow-hidden transition-all hover:shadow-md'
            >
              <CardHeader className='bg-slate-100 py-6 text-2xl dark:bg-slate-800'>
                <CardTitle className='flex items-center justify-between'>
                  <span className='flex flex-row gap-2 items-center'>
                    <BookOpen size={36}></BookOpen>
                    <span>{course.title}</span>
                  </span>
                  <span className='rounded-full bg-slate-200 px-2 py-1 text-xs font-medium dark:bg-slate-700'>
                    {course.course_id}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className='pt-2 '>
                <p className='text-base text-slate-600 dark:text-slate-400'>
                  {course.description}
                </p>
              </CardContent>

              <CardFooter className='flex justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Enroll Student</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Enroll Student in {course.title}
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      className='space-y-4 pt-4'
                      onSubmit={handleEnrollSubmit(enroll)}
                    >
                      <Input
                        type='hidden'
                        value={course.course_id}
                        {...enrollRegister('course_id')}
                      />

                      <div className='space-y-2'>
                        <Label htmlFor='student_id'>Student ID</Label>
                        <Input
                          id='student_id'
                          placeholder='Enter student ID'
                          {...enrollRegister('student_id')}
                          required
                        />
                      </div>

                      <Button type='submit' className='w-full'>
                        Complete Enrollment
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* <Button variant='outline' size='sm'>
                  View Details
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

export default CoursesPage
