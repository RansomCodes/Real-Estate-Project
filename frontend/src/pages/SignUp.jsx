import React from 'react'
import { Link } from 'react-router-dom'

function SignOut() {
  return (
    <div className='p-3'>
      <div className='mx-auto mt-5 max-w-fit sm:max-w-sm'>
        <div className='text-3xl font-semibold text-center my-6'>Sign Up</div>
        <form action="" className='flex flex-col space-y-4'>
          <input type="text"  placeholder='Username' className='border outline-none p-2 rounded-lg' id='username'/>
          <input type="text" placeholder='Email'  className='border outline-none p-2 rounded-lg' id='email'/>
          <input type="text" placeholder='Password'  className='border outline-none p-2 rounded-lg' id='password'/>
          <button className='outline-none p-2 rounded-md text-white bg-slate-700 hover:opacity-95 disabled:opacity-80'>SIGN UP</button>
        </form>
        <div className='mt-4'>Have an account? &nbsp;
          <Link to="/sign-in" className='text-blue-700'>Sign in</Link>
          </div>
      </div>
    </div>
  )
}

export default SignOut