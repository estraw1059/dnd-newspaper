"use client"
import { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import {  signOut } from "firebase/auth";
import './globals.css'
import { deleteCookie } from "cookies-next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setLoggedIn(true);
      // ...
    } else {
      // User is signed out
      setLoggedIn(false);
    }
  });

  const handleLogout = () => {
      signOut(auth);
      deleteCookie("userUID");
  }

  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        <nav className="bg-blue-500 p-4  h-[74px]">
          <div className="container mx-auto">
              <div className="flex justify-between items-center">
                  <a href="/" className="text-white text-2xl font-semibold">Waterdeep Times</a>
                  <div className="flex">
                    <div className='mx-5'>
                    {loggedIn && <a href="/createNewspaper" className="text-white hover:text-gray-300">Create New Paper</a>}
                    </div>
                    <div className='mx-5'>
                      {!loggedIn && (
                        <a href="/login" className="text-white hover:text-gray-300">Login</a>
                      )}

                      {loggedIn && (
                        <>
                          <a href="/" onClick={() => handleLogout()} className="text-white hover:text-gray-300 m-10">Log out</a>
                          <a href="/userProfile" className="text-white hover:text-gray-300 m-10">Profile</a>
                        </>
                      )}
                    </div>
                  </div>
              </div>
          </div>
        </nav>
        <div className="h-[calc(100vh-74px)]">
            {children}
        </div>
      </body>
    </html>
  )
}
