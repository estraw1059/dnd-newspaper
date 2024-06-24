"use client"
import { getCookie } from "cookies-next";
import { db, app }  from "../../firebase";
import { query, where, collection, getDocs, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

type UserArticle = {
  createdDate: string;
  pagePassword: string;
  uid: string;
}


export default function Page() {

  const [userArticles, setUserArticles] = useState<UserArticle[]>([]);

  useEffect(() => {
    const getUserNewspapers = async () => {
      const userUID = getCookie("userUID");
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