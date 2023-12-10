"use client"
import React, { useEffect, useState } from 'react';
import ArticleForm, { Article } from '@/components/createArticleForm/ArticleForm';

const page = () => {
    const [articleNumber, setArticleNumber] = useState(0);
    const [articleList, setArticleList] = useState<Article[]>([]);
    useEffect(() => {
        if (articleNumber !== 4) {
            return;
        }
        // We will need create the new newspaper
        console.log(articleList);
    }, [articleNumber])
    return (
        <div>
            <ArticleForm articleNumber={articleNumber} setArticleNumber={setArticleNumber} setArticleList={setArticleList}/>
        </div>
    );
};

export default page;