import React from 'react';
import {useHistory} from 'react-router-dom';
import './BookCard.css';

const BookCard = ({item}) => {
    const history = useHistory();

    const onBookClick = (id) => {
        console.log(id);
        history.push('/book/' + id);
    }

    return (
        <div className="bookCardContainer" onClick={() => {onBookClick(item.id)}}>
            <img src={item.bookCover} alt=""/>
            <span className="bookTitle">{item.bookName}</span>
            <span className="bookAuthor">{item.bookAuthor}</span>
            <span className="bookCost">₹{item.bookCost}</span>
        </div>
    );
}

export default BookCard;