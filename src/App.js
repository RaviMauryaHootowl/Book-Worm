import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import BookDetails from './components/BookDetails/BookDetails';
import SellBook from './components/SellBook/SellBook';
import AccountsPage from './components/AccountsPage/AccountsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/book/:id" component={BookDetails} />
          <PrivateRoute exact path="/sellbook" component={SellBook} />
          <PrivateRoute exact path="/account" component={AccountsPage} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
