import { ThemeSwitcher } from '@/components/Switchers/ThemeSwitcher'
import Link from 'next/link'

export function Header() {
  return (
    <div className="fixed top-0 z-10 flex h-28 w-full items-center justify-between bg-skin-fill-primary px-4 shadow-md sm:h-14">
      <div className="flex h-full flex-col sm:flex-row sm:gap-4">
        <Link href="/" className="flex h-1/2 items-center text-lg font-semibold sm:h-full">
          Cookiecutter Next.js Template
        </Link>
        <div className="flex h-1/2 sm:h-full">
          <Route text="Components" path="/components" />
          <Route text="Users" path="/users" />
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  )
}

function Route({ path, text }: { path: string; text: string }) {
  return (
    <Link
      href={path}
      className="flex h-full items-center p-2 font-medium hover:bg-black hover:bg-opacity-10 active:bg-opacity-25"
    >
      {text}
    </Link>
  )
}
