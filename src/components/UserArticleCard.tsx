import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


type UserArticleCardProps = {
    newsPaperTitle: string;
    password: string;
    createdDate: string;
}

const UserArticleCard = (props: UserArticleCardProps) => {
    const { newsPaperTitle, password, createdDate } = props;

    return (
        <Card className='m-1 p-3 bg-#efefef text-black rounded-lg border border-gray-300 shadow-lg w-96' style={{ height: '200px' }}>
        <Card.Header className='flex justify-between'>
          <Card.Title><strong className="block mb-2">{newsPaperTitle}</strong></Card.Title>
          <div>
            <Link target="_blank" className='hover:text-blue-800 underline' href={`/?password=${password}`}>
              <i className="bi bi-box-arrow-up-right p-2"/>
            </Link>
            <Link target="_blank" className='hover:text-blue-800 underline' href={`/edit?password=${password}`}>
              <i className="bi bi-pencil-square p-2"/>
            </Link>
          </div>
          
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Password: {password}
            <br />
            Created Date: {createdDate}
          </Card.Text>
        </Card.Body>
      </Card>
    );
};

export default UserArticleCard;