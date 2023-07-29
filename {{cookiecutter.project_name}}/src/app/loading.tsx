'use client'

import { Spinner } from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-[#3c3c43] dark:text-[#f7fafc]">
      <Spinner />
    </div>
  )
}
