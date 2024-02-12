"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { auth } from '../../firebase';

export type ArticleBaseInfoObject = {
  articlePassword: string;
  user?: string;
}

export type User = {
  uid: string;
}

type articleBaseProps = {
  articleBaseInfo: ArticleBaseInfoObject;
  setArticleBaseInfo: React.Dispatch<React.SetStateAction<ArticleBaseInfoObject>>;
  setBaseInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleBaseInfo = (props: articleBaseProps) => {
    const { articleBaseInfo, setArticleBaseInfo, setBaseInfo } = props;
    const [user, setUser] = useState<User | undefined>(undefined);

    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setArticleBaseInfo({
        articlePassword: e.target.value,
        user: ''
      });
    }
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Move to next page
      setArticleBaseInfo(baseInfo => ({ 
        articlePassword: baseInfo.articlePassword.toLocaleLowerCase(), 
        user: user?.uid || undefined }))
      setBaseInfo(false);
    };
    return (
      <div className="max-w-md mx-auto p-10 m-10 bg-slate-600">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
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
      </div>
    );
};

export default ArticleBaseInfo;