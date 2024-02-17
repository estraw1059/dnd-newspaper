import { db }  from "../../firebase";
import { query, collection, getDocs, DocumentData, where } from "firebase/firestore";

type UserArticle = {
  createdDate: string;
  pagePassword: string;
  uid: string;
}


export default async function Page() {

  async function getUserNewspapers(): Promise<UserArticle[]> {
    'use server'
    // Redo With Cookie
    // const q = query(collection(db, "userPage"), where('uid', '==', 'OrmFhLO4A8MbvKeMMJbISjnbkGG2'));
    // const querySnapshot = await getDocs(q);

    const tempDocs: UserArticle[] = [];
    // querySnapshot.forEach((doc: DocumentData) => {
    //     tempDocs.push(doc.data());
    // });
    console.log(tempDocs);
    return tempDocs;
  }

  const userArticles = await getUserNewspapers();

  return (
    <div>
      {userArticles.map((article, key) => {
        return (<div key={key}>{article.pagePassword}</div>)
      })}
    </div>

  )
}