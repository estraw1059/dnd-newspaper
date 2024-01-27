/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react';
import ArticleForm, { Article } from '@/components/createArticleForm/ArticleForm';
import ArticleBaseInfo from '@/components/createArticleForm/ArticleBaseInfo';
import {addDoc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../firebase';
import { useRouter } from 'next/navigation'
import { redirect } from '../../../node_modules/next/navigation';

const page = () => {
    const [baseInfoSet, setBaseInfoSet] = useState(true);
    const [articleBaseInfo, setArticleBaseInfo] = useState({articlePassword: ''});
    const [articleNumber, setArticleNumber] = useState(0);
    const [articleList, setArticleList] = useState<Article[]>([]);
    const router = useRouter();


    /**
     * I need to find a way to store login state in cache? 
     * Tried on Auth change but that didn't work right
     * 
     */
    // useEffect(() => {
    //     console.log('Logged in ', auth.currentUser);
    //     if(false) {
    //         router.push('/login');
    //     }
    // }, [auth])

    auth.onAuthStateChanged(user => {
        user ? null : router.push('/login');
     });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (articleNumber !== 4) {
            return;
        }
        // We will need create the new newspaper
        console.log(articleList);
        articleList.forEach(article => {
            const fullArticle = {
                articleNumber: article.articleNumber,
                articleTitle: article.articleTitle,
                articleText: article.articleText,
                articlePassword: articleBaseInfo.articlePassword
            };
            addDoc(collection(db, "articles"), fullArticle);
        })
    }, [articleBaseInfo.articlePassword, articleList, articleNumber])

    if(baseInfoSet) {
        return (
            <ArticleBaseInfo articleBaseInfo={articleBaseInfo} setArticleBaseInfo={setArticleBaseInfo} setBaseInfo={setBaseInfoSet} />
        )
    }

    return (
        <div>
            <ArticleForm articleNumber={articleNumber} setArticleNumber={setArticleNumber} setArticleList={setArticleList}/>
        </div>
    );
};

export default page;