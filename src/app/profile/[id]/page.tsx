'use client'



export default function Page({ params }: any) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4 text-center">Profile Information</h1>
          <p className="text-lg text-gray-700 text-center">{params.id}</p>
        </div>
      </div>
    );
  }
  
