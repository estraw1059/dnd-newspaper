"use client"
import React from 'react';
import { auth, db } from '../../../firebase';
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();

    auth.onAuthStateChanged(user => {
        user ? null : router.push('/login');
     });


    return (
        <div>
            This is the page to see all newspapers once it is created
        </div>
    );
};

export default page;