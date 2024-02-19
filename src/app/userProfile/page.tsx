

type UserArticle = {
  createdDate: string;
  pagePassword: string;
  uid: string;
}


export default async function Page() {

  async function getUserNewspapers(): Promise<UserArticle[]> {
    'use server'
    var admin = require("firebase-admin");
    var serviceAccount = require("adminAPIKey.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    // Redo With Cookie

    // auth.verifyToken(authToken).then((decodedToken: { uid: any; }) => {
    //   const uid = decodedToken.uid;
    //   console.log('Found User: ', uid);
    // })
    // .catch((error) => {
    //   console.log('Error decoding token', error);
    // });
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