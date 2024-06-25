import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';


type UserArticleCardProps = {
    newsPaperTitle: string;
    password: string;
    createdDate: string;
}

const UserArticleCard = (props: UserArticleCardProps) => {
    const { newsPaperTitle, password, createdDate } = props;

    return (
        <Card className='m-1 p-10 bg-#efefef text-black rounded-lg'>
        <Card.Body>
          <Card.Title>{newsPaperTitle}</Card.Title>
          <Card.Text>
            Password: <Link className='hover:text-blue-800 underline' href={`/?password=${password}`}>{password}</Link>
            <br />
            Created Date: {createdDate}
          </Card.Text>
        </Card.Body>
      </Card>
    );
};

export default UserArticleCard;