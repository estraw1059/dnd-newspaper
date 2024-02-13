import { db }  from "../../firebase";
import { query, collection, getDocs, DocumentData } from "firebase/firestore";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type UserArticle = {
  createdDate: string;
  pagePassword: string;
  uid: string;
}


export default function Page() {

  async function getUserNewspapers(): Promise<UserArticle[]> {
    'use server'
    const q = query(collection(db, "userPage"));
    const querySnapshot = await getDocs(q);

    const tempDocs: UserArticle[] = [];
    querySnapshot.forEach((doc: DocumentData) => {
        tempDocs.push(doc.data());
    });
    console.log(tempDocs);
    return tempDocs;
  }

  const userArticles = getUserNewspapers();

  return (
    <div>The user will see their newspapers on this page</div>

  )
}