"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import NewsArticle from './NewsArticle';
import './NewsPaperOnlineArticle.css'
import { db }  from "../firebase";
import { query, where, orderBy, collection, getDocs, DocumentData } from "firebase/firestore";

type articleDoc = {
    articleId: string;
    articlePassword: string | undefined;
    articleText: string;
    articleNumber: number;
    articleTitle: string;
    newspaperId: string;
}

type PaperProps = {
    password: string | undefined;
    pageSubDomain: string | undefined;
    editMode: boolean;
}

const NewsPaperFullPageOnline = (props: PaperProps) => {
    const { password, editMode, pageSubDomain } = props;
    const [articles, setArticles] = useState<articleDoc[]>([]);


    useEffect(() => {
        if (password === undefined) {
            setArticles([]);
            return;
        }
        // Fetch data and set the state within the useEffect.
        const fetchDataNoSubDomain = async () => {
            const q = query(collection(db, "articles"), where('articlePassword', '==', password), orderBy("articleNumber"));
            const querySnapshot = await getDocs(q);
    
            const tempDocs: articleDoc[] = [];
            querySnapshot.forEach((doc: DocumentData) => {
                tempDocs.push({
                    articleId: doc.id,
                    ...doc.data()
                });
            });
            await setArticles(tempDocs);
        };
    
        if (!pageSubDomain) {
            //This is the old route
            fetchDataNoSubDomain();
            return;
        
        }

        //This is the new route
        const fetchDataWithSubDomain = async () => {
            const newspaperQuery = query(collection(db, "newspapers"), where('password', '==', password), where('subdomain', '==', pageSubDomain));
            const querySnapshot = await getDocs(newspaperQuery);
            // If Size is 0 we didn't find anything. Return and move on
            if (querySnapshot.size === 0) {
                setArticles([]);
                return;
            }
            // We should only have one domain/password combo.
            // I haven't written the enforcing of that yet but we will later
            const newspaperId = querySnapshot.docs[0].id;

            const articleQuery = query(collection(db, "articles"), where('newspaperId', '==', newspaperId), orderBy("articleNumber"));
            const articleSnapshot = await getDocs(articleQuery);
            const tempDocs: articleDoc[] = [];
            articleSnapshot.forEach((doc: DocumentData) => {
                tempDocs.push({
                    articleId: doc.id,
                    ...doc.data()
                });
            });
            await setArticles(tempDocs);
        };
        fetchDataWithSubDomain();
    
    }, [password]);

    const articleComp = articles.map((article: articleDoc) => {
        return (
            <div key={article.articleNumber} className="fp-item">
                <NewsArticle title={article.articleTitle} text={article.articleText} editView={editMode} articleId={article.articleId}/>
            </div>
        );
    })

    if(articleComp.length !== 4) {
        return null;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-rows-2 gap-4 p-10 h-full w-full text-[#000000]'>
            <div className='lg:row-span-2 lg:col-span-1 fp-cell'>
                <div className="article">
                    {articleComp[3]}
                </div>
            </div>
            <div className='lg:col-span-2 col-span-1'>
                <div className="article">
                    {articleComp[0]}
                </div>
            </div>
            <div className='col-span-1'>
                <div className="article">
                    {articleComp[1]}
                </div>
            </div>
            <div className='col-span-1'>
                <div className="article">
                    {articleComp[2]}
                </div>
            </div>
        </div>
    );
};

export default NewsPaperFullPageOnline;

