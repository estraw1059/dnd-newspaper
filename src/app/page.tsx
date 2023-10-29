'use client'
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";
import PasswordLockUp from "@/components/PasswordLockUp";

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
  
// }

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div>
    //     <NewsArticle text='Basic New article with some text' title='Dragon Fights Spotted'/>
    //   </div>
    // </main>
    <main className="h-full">
      <PasswordLockUp/>
      <NewsPaperFullPageOnline/>
    </main>
  );
}
