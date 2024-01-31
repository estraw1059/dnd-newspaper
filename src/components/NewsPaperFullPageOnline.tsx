"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import NewsArticle from './NewsArticle';
import './NewsPaperOnlineArticle.css'
import { db }  from "../firebase";
import { query, where, orderBy, collection, getDocs, DocumentData } from "firebase/firestore";

type articleDoc = {
    articlePassword: string;
    articleText: string;
    articleNumber: number;
    articleTitle: string;
}

type PaperProps = {
    setPassword: Dispatch<SetStateAction<string | undefined>>;
    password: string | undefined;
}

const NewsPaperFullPageOnline = (props: PaperProps) => {
    const { password } = props;
    const [articles, setArticles] = useState<articleDoc[]>([]);


    useEffect(() => {
        if (password === undefined) {
            setArticles([]);
            return;
        }
        // Fetch data and set the state within the useEffect.
        const fetchData = async () => {
            console.log('Fetch Data');
            const q = query(collection(db, "articles"), where('articlePassword', '==', password), orderBy("articleNumber"));
            const querySnapshot = await getDocs(q);
    
            const tempDocs: articleDoc[] = [];
            querySnapshot.forEach((doc: DocumentData) => {
                tempDocs.push(doc.data());
                console.log(tempDocs)
            });
            await setArticles(tempDocs);
        };
    
        fetchData(); // Call the fetchData function within the useEffect.
    
    }, [password]);

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
                    {articleComp[3]}
                </div>
                <div className="fp-cell fp-cell--2">
                    <div className="fp-cell fp-cell--1">
                        {articleComp[0]}
                    </div>
                </div>
                <div className="fp-cell fp-cell--3">
                    <div className="fp-cell fp-cell--1">
                        {articleComp[1]}
                    </div>
                </div>
                <div className="fp-cell fp-cell--4">
                    <div className="fp-cell fp-cell--1">
                        {articleComp[2]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPaperFullPageOnline;

