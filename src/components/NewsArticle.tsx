import React from 'react';
import './NewsPaperOnlineArticle.css'

type articleProps = {
    title: string;
    text: string;
}

const NewsArticle = (props: articleProps) => {
    const { title, text } = props;
    return (
        <div className='textBox '>
            <h1 className='text-3xl font-bold text-center my-4'>{title}</h1>
            <div className='text-gray-700 text-justify'>{text}</div>    
        </div>
    );
};

export default NewsArticle;