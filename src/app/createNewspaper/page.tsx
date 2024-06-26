/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react';
import ArticleForm, { Article } from '@/components/createArticleForm/ArticleForm';
import {addDoc, collection } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import ArticleBaseInfo, { ArticleBaseInfoObject } from '@/components/createArticleForm/ArticleBaseInfo';

const page = () => {
    const [baseInfoSet, setBaseInfoSet] = useState(true);
    const [articleBaseInfo, setArticleBaseInfo] = useState<ArticleBaseInfoObject>(
        {
            articlePassword: '', 
            newspaperTitle: 'Waterdeep Times', 
            user: ''
        }
    );
    const [articleList, setArticleList] = useState<Article[]>([]);
    const router = useRouter();

    auth.onAuthStateChanged(user => {
        user ? null : router.push('/login');
     });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (articleList.length !== 4) {
            return;
        }
        // We will need create the new newspaper
        articleList.forEach(article => {
            const fullArticle = {
                articleNumber: article.articleNumber,
                articleTitle: article.articleTitle,
                articleText: article.articleText,
                articlePassword: articleBaseInfo.articlePassword,
                uid: articleBaseInfo.user
            };
            addDoc(collection(db, "articles"), fullArticle);
        });
        const userPage = {
            pagePassword: articleBaseInfo.articlePassword,
            articleTitle: articleBaseInfo.newspaperTitle,
            uid: articleBaseInfo.user,
            createdDate: (new Date()).toString()
        }
        addDoc(collection(db, 'userPage'), userPage);
        router.push(`/?password=${articleBaseInfo.articlePassword}`)
        
    }, [articleBaseInfo.articlePassword, articleList, router, articleBaseInfo.user])

    if(baseInfoSet) {
        return (
            <ArticleBaseInfo articleBaseInfo={articleBaseInfo} setArticleBaseInfo={setArticleBaseInfo} setBaseInfo={setBaseInfoSet} />
        )
    }

    if(articleList.length == 4) {
        return (
            <Spinner/>
        );
    }

    return (
        <div>
            <ArticleForm articleList={articleList} setArticleList={setArticleList}/>
        </div>
    );
};

export default page;