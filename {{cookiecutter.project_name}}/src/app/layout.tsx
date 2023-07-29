import '../styles/index.css'
import { ReactNode } from 'react'

import { ThemesProvider } from '@/hooks/useTheme'
import { UserProvider } from '@/hooks/useUser'
import { Inter } from 'next/font/google'

import { Header } from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Home | {{cookiecutter.project_name}}',
    template: '%s | {{cookiecutter.project_name}}'
  },
  description: '{{cookiecutter.description}}'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full scroll-smooth antialiased`}>
      <body className="bg-white text-[#3c3c43] dark:bg-[#16223b] dark:text-[#f7fafc]" suppressHydrationWarning>
        <ThemesProvider>
          <UserProvider>
            <div className="h-screen scrollbar scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b]">
              <Header />
              <div className="pt-28 sm:px-14 sm:pt-14">{children}</div>
            </div>
          </UserProvider>
        </ThemesProvider>
      </body>
    </html>
  )
}
