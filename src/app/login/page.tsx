"use client"
import React, {ChangeEvent, FormEvent, useState} from "react";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
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
        .then((userCredential) => {
          // Login successful, do something with the user data
          console.log('Logged in');
        })
        .catch((error) => {
          // Handle login errors
          console.error('Login error:', error.message);
          
        });
    };


    return (
      <div className="max-w-md mx-auto p-10 m-10 bg-slate-600">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input className="text-black" type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input className="text-black" type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

export default AdminLogin;