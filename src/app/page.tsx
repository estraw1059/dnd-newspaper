import NewsArticle from "@/components/NewsArticle";
import NewsPaperFullPageOnline from "@/components/NewsPaperFullPageOnline";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div>
    //     <NewsArticle text='Basic New article with some text' title='Dragon Fights Spotted'/>
    //   </div>
    // </main>
    <main className="h-full">
      <NewsPaperFullPageOnline/>
    </main>
  );
}
