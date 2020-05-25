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
                    <div className="">
                        {bookItem.bookName}
                    </div>
                    <div className="">
                        {bookItem.bookAuthor}
                    </div>
                    <div className="">
                        To Buy, contact : {bookItem.sellerContact}
                    </div>
                </div> : <div>Loading...</div>
            }
        </div>
    );
}

export default BookDetails;