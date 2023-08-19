'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { SignInRequest } from '@/@types/user'
import { api } from '@/services/axios'
import { User } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { useAxios } from './useAxios'

interface UserContextProps {
  user?: User
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  redirectToLoginPage(): void
  login(props: SignInRequest): Promise<{ error?: string }>
  logout(): Promise<void>
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [returnUrl, setReturnUrl] = useState('/')
  const { push, refresh } = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function retrieve() {
      const { accessToken } = parseCookies()
      if (accessToken) {
        const { data, error } = await useAxios.get('api/token')
        if (!error && data) {
          setUser(data.user)
        }
      }
    }
    retrieve()
  }, [])

  function redirectToLoginPage() {
    setReturnUrl(pathname)
    push('/login')
  }

  async function login({ login, password }: SignInRequest) {
    setLoading(true)
    const { data, error } = await useAxios.post<{ user: User; accessToken: string }>('/api/users/login', {
      login,
      password
    })
    setLoading(false)

    if (error) {
      return error
    }

    if (data) {
      setUser(data.user)
      setCookie(undefined, 'accessToken', data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })

      api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
    }

    push(returnUrl)
    setReturnUrl('/')
    return {}
  }

  async function logout() {
    api.defaults.headers.Authorization = ''
    destroyCookie(undefined, 'accessToken')
    setUser(undefined)
    refresh()
  }

  const value: UserContextProps = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    loading,
    redirectToLoginPage,
    login,
    logout
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser(): UserContextProps {
  return useContext(UserContext)
}
