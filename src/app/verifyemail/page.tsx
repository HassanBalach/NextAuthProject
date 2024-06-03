'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (token: any) => {
    try {
      await axios.post('/api/User/verifyemail', { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/Login" className="text-blue-500 underline hover:text-blue-700 transition-colors duration-300">
  <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-md shadow-md">
    Login
  </button>
</Link>

        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
