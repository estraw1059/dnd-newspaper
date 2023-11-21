"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
  
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Perform actions with collected data (e.g., submit to a server, etc.)
      console.log('Article Title:', title);
      console.log('Article Content:', content);
      // You can add further logic here to handle form submission
    };
    return (
        <form onSubmit={handleSubmit}>
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
    );
};

export default ArticleForm;