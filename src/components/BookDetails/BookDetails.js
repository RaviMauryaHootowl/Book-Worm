import React, {useContext, useState, useEffect} from 'react';
import './BookDetails.css'
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Navbar/Navbar';
import BookCard from '../BookCard/BookCard';


const BookDetails = ({match}) => {
    const id = match.params.id;
    const [bookItem, setBookItem] = useState({});

    firebase.firestore().collection('items').doc(id).get().then((res) => {
        setBookItem({...res.data(), id: id});
    })

    return (
        <div className="bookDetailsPage">
            <Navbar />
            {
                (bookItem.bookName != null) ?
                <div className="bookDetailsContainer">
                    <img className="bookCoverImage" src={bookItem.bookCover} alt=""/>
                    <div className="bookAboutDetailsContainer">
                        <span className="bookName">
                            {bookItem.bookName}
                        </span>
                        <span className="bookAuthor">
                            {bookItem.bookAuthor}
                        </span>
                        <span className="sellerNameDetails">
                            Seller Name : <span className="sellerName">{bookItem.sellerName}</span>
                        </span>
                        <span className="sellerContact">
                            To Buy, contact : <span className="sellerContactNumber">{bookItem.sellerContact}</span>
                        </span>
                    </div>
                </div> : <div>Loading...</div>
            }
        </div>
    );
}

export default BookDetails;