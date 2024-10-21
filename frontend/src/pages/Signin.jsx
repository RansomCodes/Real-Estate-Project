import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate("/");
    } catch (e) {
      setLoading(false);
      if (e.message) setError(e.message);
      else setError(e);
    }
  };

  return (
    <div className="p-3">
      <div className="mx-auto mt-5 max-w-fit sm:max-w-sm">
        <div className="text-3xl font-semibold text-center my-6">Sign In</div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="border outline-none p-2 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            className="border outline-none p-2 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="outline-none p-2 rounded-md text-white bg-slate-700 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-600 my-2 font-semibold">{error}</p>}
        <div className="mt-4">
          Don&apos;t Have an account? &nbsp;
          <Link to="/sign-up" className="text-blue-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
