'use client'

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('Sending user data:', user);
      const response = await axios.post('/api/User/Signup', user);
      console.log("Response", response);
      router.push('/Login');
    } catch (error: any) {
      console.log("Error in Sign up :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.userName.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{loading ? "Processing" : "SignUp"}</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type='submit'
            disabled={buttonDisable}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              buttonDisable ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {buttonDisable ? "No Signup" : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
}
