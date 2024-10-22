import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Profile() {
  const currentUser=useSelector(state=>state.user.user.currentUser);
  console.log(currentUser);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type="text" id="username" className='border p-3 rounded-lg '/>
        <input type="text" id="email" className='border p-3 rounded-lg '/>
        <input type="text" id="password" className='border p-3 rounded-lg '/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='text-red-700 flex justify-between'>
        <Link>Delete Account</Link>
        <Link>Sign Out</Link>
      </div>
    </div>
  )
}

export default Profile

// {
//   "_id": "6717a1e07b0616c7efa9a1f5",
//   "username": "user1",
//   "email": "user1@gmail.com",
//   "avatar": "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1729601677~exp=1729605277~hmac=7c44fbdaf3ebd9e7103c537760594ca8f10888532e1aa0a4bfaedadf3810c661&w=740",
//   "createdAt": "2024-10-22T13:00:16.754Z",
//   "updatedAt": "2024-10-22T13:00:16.754Z",
//   "__v": 0
// }