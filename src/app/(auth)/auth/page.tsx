'use client';
import Link from "next/link";
import React, { useState } from 'react'
import { Poppins } from 'next/font/google'

type Props = {}

const poppinsFont = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const AuthPage = (props: Props) => {

    const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="authPage flex flex-col justify-start items-center min-h-screen ">
      <div className="authBox w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-gray-200 mt-16 sm:mt-20 p-6 sm:p-8 rounded-xl shadow-md bg-white">
        <h3 className={`${poppinsFont.className} text-2xl sm:text-3xl font-semibold text-black`}>Welcome back</h3>
        <h4 className={`${poppinsFont.className} text-sm sm:text-md font-normal text-gray-600 mt-2`}>
          {isSignUp ? 'Create an account to get started' : 'Login to your account'}
        </h4>

        <div className="inputFields flex flex-col mt-6 gap-4 w-full">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="forgotPassword mt-4 w-full flex justify-start">
          <a href="#" className="text-sm text-black transition-all hover:underline">Forgot Password?</a>
        </div>

      <Link href="/dashboard">
        <input
          type="button"
          value={isSignUp ? 'Sign Up' : 'Login'}
          className="mt-6 w-full bg-black text-white font-semibold py-3 rounded-xl cursor-pointer hover:bg-black/90 transition-all"
        />
        </Link>

        <div className="mt-4 text-center text-sm sm:text-md">
          {isSignUp ? (
            <>Already have an account? <a href="#" className="text-black hover:underline" onClick={() => setIsSignUp(false)}>Login</a></>
          ) : (
            <>Don't have an account? <a href="#" className="text-black hover:underline" onClick={() => setIsSignUp(true)}>Sign Up</a></>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
