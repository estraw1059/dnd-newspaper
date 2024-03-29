"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';

export type Article = {
  articleTitle: string;
  articleText: string;
  articleNumber: number;
}

type articleFormProps = {
  articleList: Article[];
  setArticleList: React.Dispatch<React.SetStateAction<Article[]>>;
}

const ArticleForm = (props: articleFormProps) => {
    const { articleList, setArticleList } = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
  
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    };

    const resetAndInc = () => {
      setTitle('');
      setContent('');
    }
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      const currentArticleLength = articleList.length;
      e.preventDefault();
      setArticleList(currentArticleList => [...currentArticleList, {articleText: content, articleTitle: title, articleNumber: (currentArticleLength + 1)}]);
      // You can add further logic here to handle form submission
      if(currentArticleLength + 1 != 4) {
        resetAndInc();
      }
    };
    return (
      <div className="max-w-md mx-auto p-10 m-10 bg-slate-600">
        <form id='article-info' onSubmit={handleSubmit}>
          <div>Enter Info for Article {articleList.length + 1}</div>
          <div>
            <label htmlFor="articleTitle">Article Title:</label>
            <input
              type="text"
              id="articleTitle"
              value={title}
              onChange={handleTitleChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 text-black"
            />
         </div>
        <div>
          <label htmlFor="articleContent">Article Content:</label>
          <textarea
            id="articleContent"
            value={content}
            onChange={handleContentChange}
            rows={10} // Adjust the number of rows as needed
            cols={40} // Adjust the number of columns as needed
            className="border border-gray-300 rounded-md p-2 w-full mt-1 text-black"
          />
        </div>
        <button type="submit">Submit</button>
        </form>
      </div>
    );
};

export default ArticleForm;