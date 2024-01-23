'use client'
import { AuthProvider } from "@/components/AuthContext";
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";
import PasswordLockUp from "@/components/PasswordLockUp";
import { useState } from "react";


export default function Page() {
  const [password, setPassword] = useState<string>();
  return (
    <AuthProvider>
      <main className="h-full">
        <PasswordLockUp password={password} setPassword={setPassword}/>
        <NewsPaperFullPageOnline password={password} setPassword={setPassword}/>
      </main>
    </AuthProvider>
  );
}
