'use client'
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function Page() {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState<string>(); 
    const router = useRouter();

    useEffect(() => {
        const checkPageLoad = async () => {
            //Check that a password was provided
            const localPassword = searchParams.get('password');
            if (!localPassword) {
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
            setPassword(localPassword);
        }

        checkPageLoad();
      }, []);
    return (
        <div className="h-full">
            <NewsPaperFullPageOnline password={password} editMode={true}/>
        </div>
    );
}