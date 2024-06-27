"use client"
import { getCookie } from "cookies-next";
import { db }  from "../../firebase";
import { query, where, collection, getDocs, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import UserArticleCard from "@/components/UserArticleCard";
import { Container } from "react-bootstrap";

type UserArticle = {
  createdDate: string;
  pagePassword: string;
  articleTitle: string;
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
        return;
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
    <Container className="flex flex-col items-center bg-white h-screen p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {userArticles.map((article, key) => {
          return (<UserArticleCard key={key} newsPaperTitle={article.articleTitle} password={article.pagePassword} createdDate={article.createdDate} />)
        })}
      </div>
    </Container>

  )
}