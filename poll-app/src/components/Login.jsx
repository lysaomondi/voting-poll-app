/*  import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />

      <button onClick={login} className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>

      <button onClick={signup} className="bg-green-500 text-white px-4 py-2">
        Sign Up
      </button>
    </div>
  );
};

export default Login; 

/* import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <input 
        type="email" 
        placeholder="Email" 
        className="p-2 border" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="p-2 border" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </div>
  );
};

export default Login; */
 

/* import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const handleGoogleLogin = async () => {
    // 1. Create the provider instance
    const provider = new GoogleAuthProvider();
    
    try {
      // 2. Trigger the Google popup
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in user:", result.user.displayName);
    } catch (error) {
      console.error("Login Error:", error.message);
      // Optional: alert the user if the popup was closed
      if (error.code !== 'auth/popup-closed-by-user') {
        alert("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm my-6">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        {/* Simple Icon placeholder */
        /* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure Voting</h2>
      <p className="text-gray-500 text-center mb-6 max-w-xs">
        To ensure a fair poll, please sign in with your Google account to cast your vote.
      </p>

      <button 
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 w-full justify-center"
      >
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          alt="Google logo" 
          className="w-5 h-5"
        />
        Sign in with Google
      </button>
      
      <p className="mt-4 text-xs text-gray-400">
        We only use your ID to verify one vote per person.
      </p>
    </div>
  );
};
 }
/* export default Login; */



import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGN UP
  const handleSignUp = async () => {
  console.log("SIGN UP CLICKED");
  console.log("EMAIL:", email);
  console.log("PASSWORD:", password);

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log("USER CREATED:", userCred.user);
    alert("Account created!");
  } catch (err) {
    console.error("SIGNUP ERROR:", err.code, err.message);
    alert(err.code); // 👈 VERY IMPORTANT
  }
};

  // LOGIN
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-2xl font-bold">Login / Sign Up</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSignUp}
          className="bg-green-500 text-white px-4 py-2"
        >
          Sign Up
        </button>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;