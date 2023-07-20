import { MdLogin } from 'react-icons/md'

import { useUser } from '@/hooks/useUser'

export function LoginLogout() {
  const { isAuthenticated, redirectToLoginPage, logout } = useUser()

  return (
    <div
      onClick={isAuthenticated ? logout : redirectToLoginPage}
      className="flex w-full cursor-pointer items-center justify-center gap-2 p-2 text-lg"
    >
      {isAuthenticated ? (
        <>
          Sign Out
          <MdLogin size={24} />
        </>
      ) : (
        <>
          Sign In
          <MdLogin size={24} />
        </>
      )}
    </div>
  )
}
