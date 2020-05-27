import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import Navbar from '../Navbar/Navbar';
import './AccountsPage.css';
import firebase from '../../firebase';

const AccountsPage = () => {
    const {currentUser} = useContext(AuthContext);
    const [sellerData, setSellerData] = useState({});
    const [sellerBooksList, setSellerBooksList] = useState([]);
    const [booksListDetails, setBooksListDetails] = useState([]);

    useEffect(() => {
        if(currentUser != null){
            console.log('Here!!!!!!');
            fetchDetailsOfUser();
        }
    }, [])

    const fetchDetailsOfUser = () => {
        if(currentUser != null){
            firebase.firestore().collection('users').doc(currentUser.uid).get().then((res) => {
                console.log(res.data());
                setSellerData(res.data());
                setSellerBooksList(res.data().books);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    useEffect(()=> {
        fetchBooksList();
    }, [sellerBooksList])

    const fetchBooksList = () => {
        // console.log(sellerBooksList.length)
        setBooksListDetails([]);
        let tempList = new Array();
        for(let i = 0; i < sellerBooksList.length; i++){
            firebase.firestore().collection('items').doc(sellerBooksList[i]).get().then(
                (res) => {
                    tempList.push(res.data());
                    setBooksListDetails(prevArr => [...prevArr, {...res.data(), id:sellerBooksList[i]}])
                }
            )
        }
    }

    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    const deleteBookId = (id) => {
        let tempList = [...sellerBooksList];
        tempList = removeA(tempList, id);
        console.log(tempList);
        firebase.firestore().collection('users').doc(currentUser.uid).update({
            books : tempList
        })
        setSellerBooksList([]);
        setSellerBooksList(tempList);
        firebase.firestore().collection('items').doc(id).delete();
    }

    return (
        <div className="accountsPage">
            <Navbar />
            <div className="accountsPageContainer">
                <span className="pageHeader">
                    Account Details
                </span>
                <span className="userName">
                    Seller Name : {sellerData.userName}
                </span>
                <span className="userEmail">
                    Seller Email : {sellerData.email}
                </span>
                <span className="userContact">
                    Seller Contact : {sellerData.contactNumber}
                </span>
                <span className="booksListHeader">
                    Books you want to Sell
                </span>

                <div className="accountsBookList">
                    {
                        booksListDetails.map(book => {
                            // console.log('asdf');
                            // console.log(book);
                            return <div className="accountsBookCard" key={book.id}>
                                <img src={book.bookCover} alt=""/>
                                <div className="accountsBookCardDetails">
                                    <span className="bookName">{book.bookName}</span>
                                    <span className="bookAuthor">{book.bookAuthor}</span>
                                    <span className="bookCost">₹ {book.bookCost}</span>
                                    <button onClick={() => {deleteBookId(book.id)}} className="bookDeleteBtn">Delete Book from Sale</button>
                                </div>
                                
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default AccountsPage;
