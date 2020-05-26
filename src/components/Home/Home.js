import React, {useContext, useState, useEffect} from 'react';
import './Home.css'
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Navbar/Navbar';
import BookCard from '../BookCard/BookCard';
import {useHistory} from 'react-router-dom';


const Home = () => {
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const [items, setItems] = useState([]);


    useEffect(() => {
        const db = firebase.firestore();
        return db.collection("items").onSnapshot((snapshot) => {
            const itemsData = [];
            snapshot.forEach(doc => itemsData.push({ ...doc.data(), id : doc.id}));
            setItems(itemsData);
        });
    }, [])
    
    

    console.log(currentUser);
    return (
        <div className="homePage">
            <Navbar />
            <div className="allBooksContainer">
                <div className="allBooksContainerHeader">
                    <span>Books To Buy</span>
                    <button className="sellBookBtn" onClick={() => {history.push('/sellbook')}}>Sell A Book</button>
                </div>
                <div className="allBooksGrid">
                    {
                        items.map(item => (
                            <BookCard key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;