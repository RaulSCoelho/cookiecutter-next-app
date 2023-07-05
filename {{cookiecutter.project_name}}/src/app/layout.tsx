import '../styles/index.css'
import { ReactNode } from 'react'

import { ThemesProvider } from '@/hooks/useTheme'
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
      <body className="bg-skin-fill text-skin-base" suppressHydrationWarning>
        <ThemesProvider>
          <div className="h-screen scrollbar scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b]">
            <Header />
            <div className="pt-28 sm:px-14 sm:pt-14">{children}</div>
          </div>
        </ThemesProvider>
      </body>
    </html>
  )
}
