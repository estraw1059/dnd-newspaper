"use client"
import { getCookie } from "cookies-next";
import { db }  from "../../firebase";
import { query, where, collection, getDocs, DocumentData, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import UserArticleCard from "@/components/UserArticleCard";
import { Container } from "react-bootstrap";

type UserArticle = {
  createdDate: string;
  password: string;
  subdomain: string;
  title: string;
  uid: string;
};

type UserInfo = {
  firstName: string;
  lastName: string;
  subdomain: string;
};


export default function Page() {

  const [userArticles, setUserArticles] = useState<UserArticle[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const router = useRouter();

  useEffect(() => {

    const getUserInfo = async () => {
      const userUID = getCookie("userUID");
      if (!userUID) {
        // redirect to login page
        router.push("/login");
        return;
      }
      const userDoc = doc(db, 'userInfo', userUID as string);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        setUserInfo({
          firstName: docData?.firstName,
          lastName: docData?.lastName,
          subdomain: docData?.subdomain
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No User Found");
        router.push("/login");
      }
  }

    const getUserNewspapers = async () => {
      const userUID = getCookie("userUID");
      if (!userUID) {
        // redirect to login page
        router.push("/login");
        return;
      }
      const q = query(collection(db, "newspapers"), where('uid', '==', userUID));
      const querySnapshot = await getDocs(q);
      const tempDocs: UserArticle[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
          tempDocs.push(doc.data());
      });
      setUserArticles(tempDocs);
    }


    getUserNewspapers();
    getUserInfo();
  }, []);

  return (
    <Container className="flex flex-col items-center bg-white h-screen p-10 text-black">
      <div className="w-full m-3">
        <h1 className="text-3xl font-bold p-3">User Profile</h1>
        <p className="text-lg p-3">Welcome to your profile page. Here you can see all the articles you have created.</p>
          {/* Add Username Field */}
        <div className="p-3">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <span className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm max-w-[250px]">{`${userInfo?.firstName} ${userInfo?.lastName}`}</span>
        </div>

        {/* Add Subdomain Field */}
        <div className="p-3">
          <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700">Subdomain</label>
          <span className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm max-w-[250px]">/{userInfo?.subdomain}</span>
        </div>
      </div>
      <div className="w-full m-3">
        <h1 className="text-3xl font-bold p-3">Your Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {userArticles.map((article, key) => {
            return (<UserArticleCard key={key} newsPaperTitle={article.title} password={article.password} createdDate={article.createdDate} subdomain={article.subdomain} />)
          })}
        </div>
      </div>
    </Container>

  )
}