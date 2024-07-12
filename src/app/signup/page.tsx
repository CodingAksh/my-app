"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const page = () => {

  const router = useRouter();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false)

  const signUp = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await axios.post('/Api/Users/signup', user)
      console.log(response)

      toast.success('Successfully registered!')
      router.push('/login')

    } catch (error: any) {
      console.log("signUp error: ", error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col space-y-3 justify-center items-center border-2'>
      <h1 className='text-3xl mb-5'>Sign up page</h1>
      <form onSubmit={signUp} className='flex space-y-3 flex-col justify-center items-center'>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          id='username'
          className='inputField'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          id='email'
          className='inputField text-black'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          className='inputField'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <span>
          Already have an account?{' '}
          <Link className='underline' href='/login'>
            login
          </Link>
        </span>
        <button
          type='submit'
          disabled={loading}
          className='px-6 py-1.5 rounded-xl border-2 border-slate-500 text-white text-md'
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default page;