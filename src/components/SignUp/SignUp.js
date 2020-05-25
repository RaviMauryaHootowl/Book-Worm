import React, { useCallback } from 'react';
import firebase from '../../firebase';
import {useHistory} from 'react-router-dom';

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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Name
                    <input name="username" type="text" placeholder="Name" />
                </label>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;