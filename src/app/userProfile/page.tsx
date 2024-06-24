"use client"
import { getCookie } from "cookies-next";
import { db }  from "../../firebase";
import { query, where, collection, getDocs, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

type UserArticle = {
  createdDate: string;
  pagePassword: string;
  uid: string;
}


export default function Page() {

  const [userArticles, setUserArticles] = useState<UserArticle[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getUserNewspapers = async () => {
      const userUID = getCookie("userUID");
      if (!userUID) {
        // redirect to login page
        router.push("/login");
      }
      const q = query(collection(db, "userPage"), where('uid', '==', userUID));
      const querySnapshot = await getDocs(q);
      const tempDocs: UserArticle[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
          tempDocs.push(doc.data());
      });
      setUserArticles(tempDocs);
    }


    getUserNewspapers()
  }, []);

  return (
    <div>
      {userArticles.map((article, key) => {
        return (<div key={key}>{article.pagePassword}</div>)
      })}
    </div>

  )
}