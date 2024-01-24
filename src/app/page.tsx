'use client'
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";
import PasswordLockUp from "@/components/PasswordLockUp";
import { ReactElement, useState } from "react";


const Page = () => {
  const [password, setPassword] = useState<string>();
  return (
      <main className="h-full">
        <PasswordLockUp password={password} setPassword={setPassword}/>
        <NewsPaperFullPageOnline password={password} setPassword={setPassword}/>
      </main>
  );
}

export default Page;