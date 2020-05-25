import React from 'react';
import './Navbar.css';
import firebase from '../../firebase';

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <span className="navHeader">Book Worm</span>
            <button className="signOutBtn" onClick={() => {firebase.auth().signOut();}}>Sign Out</button>
        </div>
    );
}
export default Navbar;