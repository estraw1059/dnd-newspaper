"use client"
import React, { useEffect, useState } from 'react';
import NewsArticle from './NewsArticle';
import './NewsPaperOnlineArticle.css'
import { db }  from "../firebase";
import { query, collection, getDocs, DocumentData } from "firebase/firestore";

type articleDoc = {
    articlePassword: string;
    articleText: string;
    articleNumber: number;
    articleTitle: string;
}

const NewsPaperFullPageOnline = () => {
    const [articles, setArticles] = useState<articleDoc[]>([]);


    useEffect(() => {
        // Fetch data and set the state within the useEffect.
        const fetchData = async () => {
            const q = query(collection(db, "articles"));
            const querySnapshot = await getDocs(q);
    
            const tempDocs: articleDoc[] = [];
            querySnapshot.forEach((doc: DocumentData) => {
                tempDocs.push(doc.data());
            });
    
            console.log('Setting tempDocs to ', tempDocs);
            setArticles(tempDocs);
        };
    
        fetchData(); // Call the fetchData function within the useEffect.
    
    }, []);

    const articleComp = articles.map((article: articleDoc) => {
        return (
            <div key={article.articleNumber} className="fp-item">
                <NewsArticle title={article.articleTitle} text={article.articleText}/>
            </div>
        );
    })

    if(articleComp.length !== 4) {
        return null;
    }

    return (
        <div className="container">
            <div className="frontpage text-[#000000]">
                <div className="fp-cell fp-cell--1">
                    {articleComp[0]}
                </div>
                <div className="fp-cell fp-cell--2">
                    <div className="fp-cell fp-cell--1">
                        {articleComp[1]}
                    </div>
                </div>
                <div className="fp-cell fp-cell--3">
                    <div className="fp-cell fp-cell--1">
                        {articleComp[2]}
                    </div>
                </div>
                <div className="fp-cell fp-cell--4">
                    <div className="fp-cell fp-cell--1">
                        {articleComp[3]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPaperFullPageOnline;

