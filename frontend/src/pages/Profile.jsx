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

function Profile() {
  const currentUser = useSelector((state) => state.user.user.currentUser);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileError, setFileError] = useState(null);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          value={currentUser.username}
          className="border p-3 rounded-lg "
        />
        <input
          type="text"
          id="email"
          value={currentUser.email}
          className="border p-3 rounded-lg "
        />
        <input type="text" id="password" className="border p-3 rounded-lg " />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="text-red-700 flex justify-between">
        <Link>Delete Account</Link>
        <Link>Sign Out</Link>
      </div>
    </div>
  );
}

export default Profile;

// {
//   "_id": "6717a1e07b0616c7efa9a1f5",
//   "username": "user1",
//   "email": "user1@gmail.com",
//   "avatar": "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1729601677~exp=1729605277~hmac=7c44fbdaf3ebd9e7103c537760594ca8f10888532e1aa0a4bfaedadf3810c661&w=740",
//   "createdAt": "2024-10-22T13:00:16.754Z",
//   "updatedAt": "2024-10-22T13:00:16.754Z",
//   "__v": 0
// }
