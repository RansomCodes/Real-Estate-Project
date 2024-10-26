import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileError, setFileError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const dispatch = useDispatch();

  const handleFileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      }
    } catch (e) {
      dispatch(updateUserFailure(e.message));
    }
  }

  const handleDelete=async (e)=>{
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const response=await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data=await response.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  const handleSignOut=async (e)=>{
    e.preventDefault();
    try {
      dispatch(signOutUserStart());
      const response=await fetch('/api/auth/signout');
      const data=response.json();
      if(data.success===false){
        dispatch(signOutUserFailure(data.message));
      } else {
        dispatch(signOutUserSuccess(data));
      }
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-center text-sm">
          {fileError ? (
            <span className="text-red-700">Error in image upload.  Image  must be less than 2mb</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">Uploading {filePercentage}%</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">
              Successfully uploaded the image!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          className="border p-3 rounded-lg outline-none"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          className="border p-3 rounded-lg outline-none"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input type="password"
          id="password"
          className="border p-3 rounded-lg outline-none"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      <div className="text-red-700 flex justify-between">
        <button onClick={handleDelete}>Delete Account</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <p className="text-red-700 mt-5">{error?error:''}</p>
      <p className="text-green-700 mt-5">{updateSuccess? 'Account has been updated Successfully!!': ''}</p>
    </div>
  );
}

export default Profile;
