'use client'
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";
import PasswordLockUp from "@/components/PasswordLockUp";
import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'


const Page = () => {
  const [password, setPassword] = useState<string>('');
  const [show, setShow] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('password')) {
      setPassword(searchParams.get('password'));
      setShow(false);
    }
  }, [show, password]);
  return (
      <div className="h-full">
        <PasswordLockUp password={password} setPassword={setPassword} show={show} setShow={setShow}/>
        <NewsPaperFullPageOnline password={password} setPassword={setPassword}/>
      </div>
  );
}

export default Page;