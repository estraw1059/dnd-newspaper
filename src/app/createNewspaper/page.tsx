import React from 'react';
import ArticleForm from '@/components/createArticleForm/ArticleForm';

const page = () => {
    return (
        <div>
            This is where I will create a new newspaper
            <ArticleForm articleNumber={1}/>
        </div>
    );
};

export default page;