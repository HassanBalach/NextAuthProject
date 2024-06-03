'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState("")

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user.email, user.password])

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/User/Login', user)



      setShowError(response.data.error)
      if (response.data.error === undefined) {
        router.push('/profile')

      }



    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-4xl text-center mb-8">{loading ? 'Loading...' : 'Login'}</h1>
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="border border-gray-400 rounded-md p-2 w-full mb-4"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="border border-gray-400 rounded-md p-2 w-full mb-4"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={buttonDisabled || loading}
        >
          Login
        </button>
        <div className="mt-10 text-center">
          {showError && <em className="text-red-500">{showError}</em>}
        </div>

      </div>
    </div>
  )
}
