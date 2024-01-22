import nookies from 'nookies';
import {auth} from '../firebase';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: any | null }>({
  user: null,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
        console.log('User signed in or out');
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}