"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';

export type ArticleBaseInfo = {
  articlePassword: string;
}

type articleBaseProps = {
  articleBaseInfo: ArticleBaseInfo;
  setArticleBaseInfo: React.Dispatch<React.SetStateAction<ArticleBaseInfo>>;
  setBaseInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleBaseInfo = (props: articleBaseProps) => {
    const { articleBaseInfo, setArticleBaseInfo, setBaseInfo } = props;
  
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setArticleBaseInfo({
        articlePassword: e.target.value
      });
    }
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Move to next page
      setBaseInfo(false);
    };
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pagePassword">Enter Page Password:</label>
          <input
            type="text"
            id="pagePassword"
            value={articleBaseInfo.articlePassword}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 text-black"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
};

export default ArticleBaseInfo;