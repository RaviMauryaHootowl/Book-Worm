import React, {useContext, useState, useEffect} from 'react';
import './SellBook.css'
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Navbar/Navbar';
import BookCard from '../BookCard/BookCard';
import { useHistory } from 'react-router-dom';


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

    const sellBookSubmit = (e) => {
        e.preventDefault();
        //console.log(e.target.elements.bookName.value);
        const bookName = e.target.elements.bookName.value;
        const bookAuthor = e.target.elements.bookAuthor.value;
        const bookCost = e.target.elements.bookCost.value;

        const uploadTask = firebase.storage().ref(`images/${imageFile.name}`).put(imageFile);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                alert(error);
            },
            () => {
                firebase.storage().ref("images").child(imageFile.name).getDownloadURL().then(url => {
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
            history.push('/');
        })
    }

    return (
        <div className="bookSellPage">
            <Navbar />
            <div className="sellBookFormContainer">
                <form className="sellBookForm" onSubmit={sellBookSubmit}>
                    <input placeholder="Book Name" type="text" name="bookName" id=""/>
                    <input placeholder="Book Author" type="text" name="bookAuthor" id=""/>
                    <input placeholder="Set a Cost for the book" type="number" name="bookCost" id=""/>
                    <input type="file" name="bookCover" accept="image/*" id="" onChange={imageSelected}/>
                    <button type="submit">Sell Book</button>
                </form>
            </div>
        </div>
    );
}

export default SellBook;