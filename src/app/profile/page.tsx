'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Page() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleUserDetails = async () => {
        try {
            const response = await axios.get("/api/User/UserProfile");
            setUserData(response.data.data._id);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get("/api/User/Logout");
            router.push('/Login');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-4xl mb-6">User Profile</h1>
                <div className="mb-6">
                    <button onClick={handleUserDetails} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4">
                        Get User Details
                    </button>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">
                        Logout
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {userData && (
                    <div>
                        <p className="text-lg font-semibold">Click Link:</p>
                        <ul className="list-disc pl-6">
                            <Link href={`/profile/${userData}`}>
                                {userData}
                            </Link>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;
