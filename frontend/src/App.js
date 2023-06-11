
import React, { useEffect } from "react";
import Header from './components/Layout/Header';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Layout/Home";
import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/index";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/adminAction";
import ProtectedRoute from "./routes/ProtectedRoute";
import PendingRequest from "./components/Admin/PendingRequest";
import Register from "./components/Counselor/Register";
import LoginCounselor from "./components/Counselor/Login";
import Counselor from "./components/Counselor/Counselor";
import { counselorLoadUser } from "./actions/counselorAction";
import About from './components/Layout/About';
import Faqs from "./components/Layout/Faqs";
import UnderProcess from "./components/Counselor/UnderProcess";
import User from "./components/User/User";
import LoginCorner from "./components/Layout/LoginCorner";
import { CounselorProfile } from "./components/Admin/CounselorProfile";
import CounselorList from "./components/Admin/CounselorList";
import Response from "./components/Admin/Response";
import Articles from "./components/Layout/Articles";
import Volunteer from "./components/User/Volunteer";
import Volunteers from "./components/Admin/Vounteers";
import MyProfile from "./components/Counselor/MyProfile";
const App = () => {
  const {isAuthenticated} = useSelector(state=> state.auth);
 const {isAuthenticatedCounselor} = useSelector(state=>state.Counselor);

  useEffect(()=>{
    store.dispatch(loadUser());
    store.dispatch(counselorLoadUser());
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
      <Route path='/about' Component={About}/>
      <Route path='/login' Component={LoginCorner}/>
      <Route path='/articles' Component={Articles}/>
      <Route path='/faqs'Component={Faqs}/>
      <Route path='/admin/login' Component={Login}/>
      <Route path='/user' Component={User}/>
      <Route path='/volunteer' Component={Volunteer}/>
      <Route path='/admin' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Admin/>
      </ProtectedRoute>
    } exact/>
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
        <Route path='/admin/volunteers' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Volunteers/>
      </ProtectedRoute>
    } exact/>
     <Route path='/admin/counselor' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <CounselorProfile/>
      </ProtectedRoute>
    } exact/>
    <Route path='/admin/counselors' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <CounselorList/>
      </ProtectedRoute>
    } exact/>
    <Route path='/admin/response' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Response/>
      </ProtectedRoute>
    } exact/>
     <Route path='/counselor/register' Component={Register}/>
     <Route path='/counselor/login' Component={LoginCounselor}/>
     <Route path='/counselor' element={
      <ProtectedRoute isLoggedIn={isAuthenticatedCounselor}>
      <Counselor/>
      </ProtectedRoute>
    } exact/>
   <Route path='/counselor/myprofile' element={
      <ProtectedRoute isLoggedIn={isAuthenticatedCounselor}>
      <MyProfile/>
      </ProtectedRoute>
    } exact/>

    <Route path='/counselor/underprocess' element={
      <ProtectedRoute isLoggedIn={isAuthenticatedCounselor}>
      <UnderProcess/>
      </ProtectedRoute>
    } exact/>
    </Routes>
    </Router>

 
 </div>
 );
};

export default App;