'use client'
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";
import PasswordLockUp from "@/components/PasswordLockUp";
import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'


const Page = () => {
  const [password, setPassword] = useState<string>();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('password')) {
      console.log(searchParams.get('password'));
      setPassword(searchParams.get('password'));
    }
  }, [])
  return (
      <div className="h-full">
        <PasswordLockUp password={password} setPassword={setPassword}/>
        <NewsPaperFullPageOnline password={password} setPassword={setPassword}/>
      </div>
  );
}

export default Page;