import React from 'react'
import { toast } from 'react-toastify'

export default function Successcomps({data}) {
  return data && (
    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-3">
      {toast.success(data)}
    </div>
  )
}
