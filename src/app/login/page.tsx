"use client"
import React, {useState} from "react";
import {auth} from "../../Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Button, Container } from "react-bootstrap";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleLogin = (e) => {
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

    const logout = () => {
      signOut(auth).then(() => {
        navigate('/admin/login')
      })
    }
  
    if (auth.currentUser != null) {
      return (
        <Container>
            <Button onClick={logout} className='m-2'>Log Out</Button>
        </Container>
      )
    }

    return (
      <div className="h-full">
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