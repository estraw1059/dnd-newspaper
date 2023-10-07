import React from 'react';

type articleProps = {
    title: string;
    text: string;
}

const NewsArticle = (props: articleProps) => {
    const { title, text } = props;
    return (
        <div>
            <h1>{title}</h1>
            <p>{text}</p>    
        </div>
    );
};

export default NewsArticle;