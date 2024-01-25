'use client'
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";
import PasswordLockUp from "@/components/PasswordLockUp";
import { ReactElement, useState } from "react";


const Page = () => {
  const [password, setPassword] = useState<string>();
  return (
      <div className="h-full">
        <PasswordLockUp password={password} setPassword={setPassword}/>
        <NewsPaperFullPageOnline password={password} setPassword={setPassword}/>
      </div>
  );
}

export default Page;