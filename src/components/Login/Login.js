import React, { useCallback, useContext } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import firebase from '../../firebase';
import {AuthContext} from '../../contexts/AuthContext';
import {useHistory} from 'react-router-dom';

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;