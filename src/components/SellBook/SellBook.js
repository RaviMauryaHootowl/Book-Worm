import React, {useContext, useState, useEffect} from 'react';
import './SellBook.css'
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Navbar/Navbar';
import BookCard from '../BookCard/BookCard';
import uuid from 'react-uuid';
import {useHistory} from 'react-router-dom';


const SellBook = () => {
    const history = useHistory();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);

    const imageSelected = (e) => {
        if(e.target.files[0]){
            setImageFile(e.target.files[0]);
        }
    }

    const onFakeButtonClick = (e) => {
        e.preventDefault();
        document.getElementsByClassName('uploadCoverInput')[0].click();
    }

    const sellBookSubmit = (e) => {
        e.preventDefault();
        //console.log(e.target.elements.bookName.value);
        const bookName = e.target.elements.bookName.value;
        const bookAuthor = e.target.elements.bookAuthor.value;
        const bookCost = e.target.elements.bookCost.value;
        const bookCoverUUID = uuid();
        const uploadTask = firebase.storage().ref(`images/${bookCoverUUID}`).put(imageFile);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                alert(error);
            },
            () => {
                firebase.storage().ref("images").child(bookCoverUUID).getDownloadURL().then(url => {
                    addBookToDB(bookName, bookAuthor, bookCost, url);
                });
            }
        )
    }

    const addBookToDB = (bookName, bookAuthor, bookCost, url) => {
        
        firebase.firestore().collection('items').add({
            bookName : bookName,
            bookAuthor : bookAuthor,
            bookCost : bookCost,
            sellerContact : 987654321,
            sellerName : currentUser.displayName,
            bookCover : url
        }).then((res) => {
            console.log(res);
            firebase.firestore().collection('users').doc(currentUser.uid).update({
                books : firebase.firestore.FieldValue.arrayUnion(`${res.id}`)
            })
            history.push('/');
        })
    }

    return (
        <div className="bookSellPage">
            <Navbar />
            <div className="sellBookFormContainer">
                <span className="containerHeader">Sell A Book</span>
                <form className="sellBookForm" onSubmit={sellBookSubmit}>
                    <input required placeholder="Book Name" type="text" name="bookName" id=""/>
                    <input required placeholder="Book Author" type="text" name="bookAuthor" id=""/>
                    <input required placeholder="Set a Cost for the book" type="number" name="bookCost" id=""/>
                    <button onClick={onFakeButtonClick} className="uploadCoverButton">{
                        (imageFile) ? `Selected ✅` : 'Upload Book Cover Image' 
                    }</button>
                    <input required className="uploadCoverInput" type="file" name="bookCover" accept="image/*" id="" onChange={imageSelected}/>
                    <button className="sellBookBtn" type="submit">Sell Book</button>
                </form>
            </div>
        </div>
    );
}

export default SellBook;