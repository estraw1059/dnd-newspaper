'use client'
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const checkPageLoad = async () => {
            //Check that a password was provided
            const password = searchParams.get('password');
            if (!password) {
                // redirect to login page
                router.push("/");
                return;
            }
            // Check that the user was logged in
            const userUID = getCookie("userUID");
            if (!userUID) {
              // redirect to login page
              router.push("/login");
            }


        }

        checkPageLoad();
      }, []);
    return (
        <div>
            My First Page
        </div>
    );
}