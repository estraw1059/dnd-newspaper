"use client"
import React, {ChangeEvent, FormEvent, useState} from "react";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "../../../node_modules/next/navigation";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();
  
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Call Firebase's signInWithEmailAndPassword method to authenticate the user
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Login successful, do something with the user data
          router.push(`/createNewspaper`);
        })
        .catch((error) => {
          // Handle login errors
          setError(true);
          console.error('Login error:', error.message);
          
        });
    };


    return (
      <div className="max-w-md mx-auto p-10 m-10 bg-slate-600">
        {error && (
          <div className="flex justify-between bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>Unable to login</p>
            <button className="text-red-500 hover:text-red-700" onClick={() => {setError(false)}}>
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 6.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.707 4.707a1 1 0 0 0 1.414 1.414L10 11.414l4.707 4.707a1 1 0 0 0 1.414-1.414L11.414 10l4.707-4.707a1 1 0 1 0-1.414-1.414L10 8.586 5.293 3.293z"/></svg>
            </button>
          </div>
        )}
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input className="border border-gray-300 rounded-md p-2 w-full mt-1 text-black" type="email" value={email} onChange={handleEmailChange} />
          <br />
          <label>Password:</label>
          <input className="border border-gray-300 rounded-md p-2 w-full mt-1 text-black" type="password" value={password} onChange={handlePasswordChange} />
          <br />
          <div className="flex items-center justify-center">
            <button className="w-32 bg-blue-500 rounded p-2 mt-5" type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  };

export default AdminLogin;