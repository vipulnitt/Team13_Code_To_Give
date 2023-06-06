
import React, { useEffect } from "react";
import Header from './components/Layout/Header';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Home from "./components/Layout/Home";
import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/index";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/adminAction";
import ProtectedRoute from "./routes/ProtectedRoute";
import PendingRequest from "./components/Admin/PendingRequest";

const App = () => {
  const {isAuthenticated,loading,user} = useSelector(state=> state.auth);
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

 return (
  
 
 <div className="App">
       <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      href="//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember"
      rel="stylesheet"
      type="text/css"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
    <Router>
    <Header/>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/admin/login' Component={Login}/>
      <Route path='/admin' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Admin/>
      </ProtectedRoute>
    } exact/>
        <Route path='/admin/pendingrequest' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <PendingRequest/>
      </ProtectedRoute>
    } exact/>
    </Routes>
    </Router>

 
 <Footer/>
 </div>
 );
};

export default App;