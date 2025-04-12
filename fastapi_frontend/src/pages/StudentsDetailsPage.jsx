import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Mail } from 'lucide-react'
import { GraduationCap } from 'lucide-react'
import { BookOpen } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Axis3D } from 'lucide-react'
import { User } from 'lucide-react'
function StudentsDetailsPage () {
  const { id } = useParams()
  const [student, setStudent] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [courseDetails, setCourseDetails] = useState([])

  const fetchStudentDetails = async () => {
    await axios
      .get(`http://127.0.0.1:8000/students/${id}`)
      .then(res => {
        setStudent(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        console.log(err?.message)
      })
  }
  const fetchCourseDetails = async courseIds => {
    const promises = courseIds.map(id =>
      axios.get(`http://127.0.0.1:8000/courses/${id}`)
    )
    try {
      const responses = await Promise.all(promises)
      const details = responses.map(res => res.data)
      setCourseDetails(details)
    } catch (err) {
      console.error('Error fetching course details:', err.message)
    }
  }

  const fetchStudentEnrollments = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/students/${id}/courses`
      )
      const courseIds = res.data.enrolled_courses // ✅ fix here
      setEnrolledCourses(courseIds)
      fetchCourseDetails(courseIds)
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    fetchStudentDetails()
    fetchStudentEnrollments()
    fetchCourseDetails()
  }, [id])

  if (!student) {
    return <div>Loading...</div>
  }
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
      <header className='sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center space-x-2'>
            <User className='h-6 w-6 text-slate-900 dark:text-white' />
            <h1 className='text-xl font-bold text-slate-900 dark:text-white'>
              Student Details
            </h1>
          </div>

          <div className='flex items-center space-x-4'>
            <Link to='/students'>
              <Button variant='outline' size='sm'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Students
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <Card>
              <CardHeader className='bg-slate-100 dark:bg-slate-800'>
                <CardTitle>Student Profile</CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='flex flex-col items-center space-y-4 pb-6 text-center'>
                  <div className='flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'>
                    <User size={48} />
                  </div>
                  <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                    {student.name}
                  </h2>
                  <div className='rounded-full bg-slate-200 px-3 py-1 text-sm font-medium dark:bg-slate-700'>
                    ID: {student.student_id}
                  </div>
                </div>

                <Separator className='my-4' />

                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Mail className='h-5 w-5 text-slate-500 dark:text-slate-400' />
                    <div>
                      <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Email
                      </p>
                      <p className='text-slate-900 dark:text-white'>
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <User className='h-5 w-5 text-slate-500 dark:text-slate-400' />
                    <div>
                      <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Age
                      </p>
                      <p className='text-slate-900 dark:text-white'>
                        {student.age} years
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <GraduationCap className='h-5 w-5 text-slate-500 dark:text-slate-400' />
                    <div>
                      <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Enrolled Courses
                      </p>
                      <p className='text-slate-900 dark:text-white'>
                        {courseDetails.length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>

          <div className='lg:col-span-2'>
            <Card>
              <CardHeader className='bg-slate-100 dark:bg-slate-800'>
                <CardTitle className='flex items-center'>
                  <BookOpen className='mr-2 h-5 w-5' />
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                {courseDetails.length === 0 ? (
                  <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 py-12 text-center dark:border-slate-700'>
                    <BookOpen className='mb-2 h-10 w-10 text-slate-400 dark:text-slate-500' />
                    <h3 className='text-lg font-medium text-slate-900 dark:text-white'>
                      No courses enrolled
                    </h3>
                    <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
                      This student is not enrolled in any courses yet.
                    </p>
                    <Link to='/courses' className='mt-4'>
                      <Button variant='outline'>Browse Courses</Button>
                    </Link>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {courseDetails.map(course => (
                      <div
                        key={course.course_id}
                        className='rounded-lg border border-slate-200 p-4 transition-all hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900'
                      >
                        <div className='flex items-start justify-between'>
                          <div>
                            <div className='flex items-center space-x-2'>
                              <h3 className='font-medium text-slate-900 dark:text-white'>
                                {course.title}
                              </h3>
                              <span className='rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium dark:bg-slate-700'>
                                {course.course_id}
                              </span>
                            </div>
                            <p className='mt-1 text-sm text-slate-600 dark:text-slate-400'>
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>{' '}
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentsDetailsPage
