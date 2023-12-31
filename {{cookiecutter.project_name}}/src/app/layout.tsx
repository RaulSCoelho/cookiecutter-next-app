import '../styles/index.css'
import { ReactNode } from 'react'

import { ThemesProvider } from '@/hooks/useTheme'
import { Inter } from 'next/font/google'

import { ConfirmationModalControl } from './(Global)/ConfirmationModalControl'
import { MainSidebar } from './(Global)/MainSidebar'
import { SnackbarControl } from './(Global)/SnackbarControl'
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
      <body className="bg-light text-dark dark:bg-dark dark:text-light" suppressHydrationWarning>
        <ThemesProvider>
          <div
            id="app"
            className="h-screen overflow-auto scrollbar scrollbar-track-zinc-300/75 scrollbar-thumb-[#8888884b] dark:scrollbar-track-zinc-700"
          >
            <Header />
            <MainSidebar />
            {children}
          </div>
          <ConfirmationModalControl />
          <SnackbarControl />
        </ThemesProvider>
      </body>
    </html>
  )
}
