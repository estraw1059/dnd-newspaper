/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react';
import ArticleForm, { Article } from '@/components/createArticleForm/ArticleForm';
import {addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
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
            user: '',
            newspaperId: ''
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
        
        const createNewspaper = async () => {
            const userInfoRef = doc(db, 'userInfo', articleBaseInfo.user as string);
            const userInfoSnap = await getDoc(userInfoRef);
            let userSubDomain = '';
            if (userInfoSnap.exists()) {
                // Access userInfoSnap properties here
                userSubDomain = userInfoSnap.data().subdomain;
            }
    
            console.log('User Sub Domain is ' + userSubDomain);
            // We will need create the new newspaper
            articleList.forEach(article => {
                const fullArticle = {
                    articleNumber: article.articleNumber,
                    articleTitle: article.articleTitle,
                    articleText: article.articleText,
                    uid: articleBaseInfo.user,
                    newspaperId: articleBaseInfo.newspaperId
                };
                addDoc(collection(db, "articles"), fullArticle);
            });
            console.log('Articles Added with newspaper id ' + articleBaseInfo.newspaperId);
            const newspapers = {
                password: articleBaseInfo.articlePassword,
                title: articleBaseInfo.newspaperTitle,
                uid: articleBaseInfo.user,
                subdomain: userSubDomain,
                createdDate: (new Date()).toString()
            }
            setDoc(doc(db, 'newspapers', articleBaseInfo.newspaperId as string), newspapers);
            console.log('Newspaper Added');
            //This needs to be updated
            router.push(`${userSubDomain}/edit?password=${articleBaseInfo.articlePassword}`)
        }

        createNewspaper();
        
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