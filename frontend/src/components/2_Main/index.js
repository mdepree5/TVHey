// import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
// import { authenticate } from "../../store/session";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import Navigation from '../1_Navigation/index';
import Footer from '../3_Footer/index';

import LoginForm from "../../components/0_Session/LoginForm";
import SignUpForm from "../../components/0_Session/SignUpForm";
import ProtectedRoute from "../../components/0_Session/ProtectedRoute";
import UsersList from "../../components/UsersList";
import User from "../../components/User";
import Chat from "../../components/Chat";


import { loginDemo } from '../../store/session';

import LeftNav from '../4_LeftNav';
// todo ——————————————————————————————————————————————————————————————————————————————————
import './Main.css'

export const UnAuthenticatedApp = () => {
  const dispatch = useDispatch();

  return (
  <div className='main-page'>
    <div>The Unauthenticated App</div>
      <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
      <NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
      <button onClick={async() => await dispatch(loginDemo())}>Demo</button>
    <Switch>
      <Route exact path="/login"><LoginForm /></Route>
      <Route exact path="/sign-up"><SignUpForm /></Route>
      <Route path="*"><Redirect to="/login" /></Route>
    </Switch>
  </div>
  )
}

  export const ListContainer = ({flexDirection='column', children, width='100%', height='100%'}) => <div style={{flexDirection, width, height}} className='list-container'>{children}</div>
  export const ChannelContainer = ({flexDirection='column', children, width='100%', height='100%'}) => <div style={{flexDirection, width, height}} className='list-container'>{children}</div>
  
export const AuthenticatedApp = () => (
    <>
      <Navigation/>

      <ListContainer flexDirection='row'>
        <LeftNav />
      
      <ChannelContainer>
        <div style={{color: 'red', padding:'10px', border: '2px solid red'}}>Channel Container!</div>
        <Switch>
          <ProtectedRoute exact path="/" ><div>MODAL WITH "HEY WELCOME TO SLACK START WRITING HERE!!"</div><button>CLICK ME TO START WRITING</button></ProtectedRoute>
          <ProtectedRoute exact path="/channels/:channelId" ><div>Load Channel Here</div><Chat/></ProtectedRoute>
          <Route><Redirect to='/' /></Route>
        </Switch>


      
      </ChannelContainer>
      </ListContainer>
      <Footer/>
    </>
  )