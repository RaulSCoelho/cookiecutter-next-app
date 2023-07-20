import { Login } from '.'

export const metadata = {
  title: 'Login'
}

export default function LoginPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Login />
    </div>
  )
}
