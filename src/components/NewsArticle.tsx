import React, { useState } from 'react';
import './NewsPaperOnlineArticle.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Spinner } from 'react-bootstrap';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';


type articleProps = {
    title: string;
    text: string;
    articleId: string;
    editView: boolean;
}

const NewsArticle = (props: articleProps) => {
    const { title, text, editView, articleId } = props;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editableText, setEditableText] = useState(props.text);
    const [editableTitle, setEditableTitle] = useState(props.title);
    const [saving, setSaving] = useState<boolean>(false);

    const handleSave = () => {
        setSaving(true);
        const articleRef = doc(db, 'articles', articleId);
        setDoc(articleRef, { articleText: editableText, articleTitle: editableTitle }, { merge: true })
        .then(() => {
            setEditMode(false);
            setSaving(false);
        });
    }
    
    if (saving) {
        return (
            <div className='textBox'>
                <Spinner animation='border'/>
            </div>
        );
    }

    return (
        <div className='textBox'>
            {editMode ? (
                <>
                    <div className='h-full w-full flex flex-col p-10'>
                        <div className='flex flex-row-reverse'>
                            <div className='p-2'>
                                <Button onClick={handleSave}>
                                <i className="bi bi-floppy" />
                                </Button>
                            </div>
                        </div>
                        <textarea className='text-3xl font-bold text-center my-4 resize-none overflow-auto'
                            value={editableTitle}
                            onChange={(e) => setEditableTitle(e.target.value)}
                        />
                        <textarea
                            className='m-2 flex-1 width-full min-h-[300px] border border-gray-300 rounded-md p-2 w-full mt-1 text-black resize-none overflow-auto'
                            value={editableText}
                            onChange={(e) => setEditableText(e.target.value)}
                        />
                    </div>
                </>
            ) : 
            (
                <>
                    {editView && (
                        <div className='flex flex-row-reverse'>
                            <div className='p-2'>
                                <Button onClick={() => setEditMode(true)}>
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className='p-10'>
                        <h1 className='text-3xl font-bold text-center my-4'>{editableTitle}</h1>
                        <div className='text-gray-700 text-justify'>{editableText}</div>
                    </div>
                </>
            )}
        </div>

    );
};

export default NewsArticle;