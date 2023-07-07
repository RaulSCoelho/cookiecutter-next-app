'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdTrash as Trash } from 'react-icons/io'

import { Button } from '@/components/Buttons'
import { Snackbar } from '@/components/Feedback/Snackbar'
import { Input } from '@/components/Input'
import { useAxios } from '@/hooks/useAxios'
import { createUserSchema } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'

import Loading from '../loading'

interface Props {
  users: User[]
}

export function Users({ users }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({ resolver: zodResolver(createUserSchema) })
  const [userList, setUserList] = useState<User[]>(users || [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(user: User) {
    setIsLoading(true)
    const { data, error } = await useAxios.post<User>('api/users', user)
    if (error) {
      setError(error.error)
    } else {
      setUserList(prev => [...prev, data])
    }
    setIsLoading(false)
  }

  async function handleDelete(id: string) {
    setIsLoading(true)
    const { error } = await useAxios.delete(`api/users/${id}`)
    if (error) {
      setError(error.error)
    } else {
      setUserList(prev => prev.filter(u => u.id !== id))
    }
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading && <Loading />}
      <Snackbar open={!!error} message={error} type="error" onClose={() => setError('')} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="name" register={register('name')} error={errors.name?.message} />
          <Input label="email" register={register('email')} error={errors.email?.message} />
        </div>
        <Button type="submit" className="mt-4" loading={isLoading} loadingColored>
          Create User
        </Button>
      </form>
      {userList.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {userList.map(user => (
            <div
              key={user.id}
              className="relative flex flex-col items-center overflow-hidden rounded bg-skin-fill-secondary p-4 text-skin-base shadow"
            >
              <p className="break-all font-semibold">{user.name}</p>
              <p className="break-all font-semibold">{user.email}</p>
              <Trash
                size={22}
                className="absolute right-1 top-1 cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(user.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
