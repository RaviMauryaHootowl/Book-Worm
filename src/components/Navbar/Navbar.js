import React from 'react';
import './Navbar.css';
import firebase from '../../firebase';
import {useHistory} from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();
    return (
        <div className="navbarContainer">
            <span onClick={() => {history.push('/');}} className="navHeader">Book Worm</span>
            <button className="signOutBtn" onClick={() => {firebase.auth().signOut();}}>Sign Out</button>
        </div>
    );
}
export default Navbar;