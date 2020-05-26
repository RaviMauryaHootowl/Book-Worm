import React, { useCallback, useContext } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import firebase from '../../firebase';
import {AuthContext} from '../../contexts/AuthContext';
import {useHistory} from 'react-router-dom';
import './Login.css';

const Login = () => {
    const history = useHistory();
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password} = event.target.elements;
        try{
            await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
            history.push('/');
        } catch(error){
            alert(error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);

    if(currentUser){
        return <Redirect to="/" />;
    }

    return(
        <div className="loginPage">
            <div className="loginContainer">
                <span className="containerHeader">Login</span>
                <form className="loginForm" onSubmit={handleLogin}>
                    <label>
                        Email
                        <input required name="email" type="email" placeholder="Email" />
                    </label>
                    <label>
                        Password
                        <input required name="password" type="password" placeholder="Password" />
                    </label>
                    <button className="loginBtn" type="submit">Login</button>
                    <span onClick={() => history.push('/signup')} className="createAccountBtn">Create a new Account</span>
                </form>
            </div>
        </div>
    );
}

export default Login;