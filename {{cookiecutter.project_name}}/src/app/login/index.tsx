'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Snackbar } from '@/components/Feedback/Snackbar'
import { Input } from '@/components/Input'
import { useUser } from '@/hooks/useUser'
import { SignInRequest, signInSchema } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInRequest>({ resolver: zodResolver(signInSchema) })
  const { login, loading } = useUser()
  const [error, setError] = useState('')

  async function onSubmit(creds: SignInRequest) {
    const { error } = await login(creds)
    if (error) {
      setError(error)
    }
  }

  return (
    <div className="flex w-full max-w-[400px] flex-col justify-center">
      <Snackbar open={!!error} message={error} onClose={() => setError('')} type="error" />
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border p-4">
        <h2 className="mb-4 text-center text-2xl font-bold">Sign In</h2>
        <div className="mb-4 flex flex-col gap-4">
          <Input label="login" error={errors.login?.message} {...register('login')} />
          <Input label="password" type="password" error={errors.password?.message} {...register('password')} />
        </div>
        <Button type="submit" loading={loading} className="mt-2 w-full">
          Sign In
        </Button>
      </form>
    </div>
  )
}
