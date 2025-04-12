import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Plus, User2Icon, UserCircle2Icon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
function StudentsPage () {
  const [students, setStudents] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()
  const fetchStudents = () => {
    axios
      .get('http://127.0.0.1:8000/students-data')
      .then(res => {
        setStudents(res.data)

        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        console.log(err?.message)
      })
  }
  const addStudent = async data => {
    await axios
      .post('http://127.0.0.1:8000/students', { ...data })
      .then(res => {
        toast.success('Student Data added ')
        console.log('Student added')
        fetchStudents()
      })
      .catch(err => {
        console.log(err)
        console.log(err?.message)
      })
  }
  useEffect(() => {
    fetchStudents()
  }, [])
  return (
    <div className='min-h-screen px-20 py-8'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex text-4xl items-center flex-row gap-2'>
          <UserCircle2Icon size={44}></UserCircle2Icon>
          <h1>Students</h1>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form
              className='space-y-4 pt-4'
              onSubmit={handleSubmit(addStudent)}
            >
              <div className='space-y-2'>
                <Label htmlFor='student_id'>Student ID</Label>
                <Input
                  id='student_id'
                  placeholder='e.g., 104'
                  {...register('student_id')}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  placeholder='e.g., John Doe'
                  {...register('name')}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='e.g., john@example.com'
                  {...register('email')}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='age'>Age</Label>
                <Input
                  id='age'
                  type='number'
                  placeholder='e.g., 20'
                  {...register('age')}
                  required
                />
              </div>

              <Button type='submit' className='w-full'>
                Add Student
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {students.map(student => (
              <Card
                key={student.student_id}
                className='overflow-hidden transition-all hover:shadow-md'
              >
                <CardHeader className='bg-slate-100 py-4 dark:bg-slate-800'>
                  <CardTitle
                    className={'text-2xl flex flex-row items-center gap-2'}
                  >
                    <UserCircle2Icon size={40}></UserCircle2Icon>
                    <h1>{student.name}</h1>
                  </CardTitle>
                </CardHeader>

                <CardContent className='pt-2'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        ID:
                      </span>
                      <span className='rounded-full bg-slate-200 px-2 py-1 text-xs font-medium dark:bg-slate-700'>
                        {student.student_id}
                      </span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Email:
                      </span>
                      <span className='text-sm text-slate-900 dark:text-slate-200'>
                        {student.email}
                      </span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Age:
                      </span>
                      <span className='text-sm text-slate-900 dark:text-slate-200'>
                        {student.age}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className='border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900'>
                  <Link
                    to={`/student/${student.student_id}`}
                    className='w-full'
                  >
                    <Button variant='default' className='w-full'>
                      View Details
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
export default StudentsPage
