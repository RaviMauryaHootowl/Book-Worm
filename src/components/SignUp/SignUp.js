import React, { useCallback } from 'react';
import firebase from '../../firebase';
import {useHistory} from 'react-router-dom';
import './SignUp.css'

const SignUp = () => {
    const history = useHistory();
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { username, email, password} = event.target.elements;
        try{
            await firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(
                (result) => {
                    result.user.updateProfile({
                        displayName : username.value
                    })
                }
            );
            history.push('/');
        } catch(error){
            alert(error);
        }
    }, [history]);

    return(
        <div className="signUpPage">
            <div className="signUpContainer">
                <span className="containerHeader">Sign Up</span>
                <form className="signUpForm" onSubmit={handleSignUp}>
                    <label>
                        Name
                        <input required name="username" type="text" placeholder="Name" />
                    </label>
                    <label>
                        Email
                        <input required name="email" type="email" placeholder="Email" />
                    </label>
                    <label>
                        Password
                        <input required name="password" type="password" placeholder="Password" />
                    </label>
                    <button className="signUpBtn" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;