import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from "../../store/session";

import LoginForm from "../../components/0_Session/LoginForm";
import SignUpForm from "../../components/0_Session/SignUpForm";
import ProtectedRoute from "../../components/0_Session/ProtectedRoute";
import UsersList from "../../components/UsersList";
import User from "../../components/User";
import Chat from "../../components/Chat"

import LogoutButton from '../../components/0_Session/LogoutButton';
import LeftNav from '../4_LeftNav';

// todo ——————————————————————————————————————————————————————————————————————————————————
import './Main.css'




const UnAuthenticatedApp = ({authenticated, setAuthenticated}) => (
  <div className='main-page'>
    <div>The Unauthenticated App</div>
      <NavLink to="/login" exact={true} activeClassName="active">
        Login
      </NavLink>
      <div style={{width: '20px'}}/>
      <NavLink to="/sign-up" exact={true} activeClassName="active">
        Sign Up
      </NavLink>
      <div style={{width: '20px'}}/>
    <Switch>
      <Route exact path="/login">
        <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <Route exact path="/sign-up">
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <Route path="*">
        <Redirect to="/login" />
      </Route>
  
    </Switch>
  </div>
  )

  export const ListContainer = ({flexDirection='column', children, width='100%', height='100%'}) => <div style={{flexDirection, width, height}} className='list-container'>{children}</div>
  
  const AuthenticatedApp = ({authenticated, setAuthenticated}) => (
    <div className='main-page'>
      <ListContainer flexDirection='row' height='48px'>
        <div>The Authenticated App</div>
        <LogoutButton setAuthenticated={setAuthenticated} />
        <NavLink to="/users" exact={true} activeClassName="active">Users</NavLink>
      </ListContainer>
      <ListContainer flexDirection='row'>
        <LeftNav />

        <Switch>
          <ProtectedRoute exact path="/" authenticated={authenticated}><div>MODAL WITH "HEY WELCOME TO SLACK START WRITING HERE!!"</div><button>CLICK ME TO START WRITING</button></ProtectedRoute>
          <ProtectedRoute exact path="/users" authenticated={authenticated}><UsersList/></ProtectedRoute>
          <ProtectedRoute exact path="/users/:userId" authenticated={authenticated}><User /></ProtectedRoute>

          <ProtectedRoute exact path="/channels/:channelId" authenticated={authenticated}><div>Load Channel Here</div><Chat/></ProtectedRoute>
          <ProtectedRoute exact path="/dms/:dmId" authenticated={authenticated}><div>Load DM Here</div><Chat/></ProtectedRoute>
          
          <Route><Redirect to='/' /></Route>
          {/* <Route><PageNotFound/></Route> */}

        </Switch>
      </ListContainer>
    </div>
  )


const Main = () => {
  const dispatch = useDispatch();
  // const [authenticated, setAuthenticated] = useState(false);
  // console.log('authenticated?', authenticated)
  
  const authenticated = true
  // const sessionUser = useSelector(state => state?.session?.user);
  // console.log('SESSION USER', sessionUser);
  // if (sessionUser) setAuthenticated(true);
  
  useEffect(() => { dispatch(authenticate()) }, [dispatch])

  const MainContainer = ({children}) => <div className='main-container'>{children}</div>

  return (
    <MainContainer>
      {authenticated ? 
        <AuthenticatedApp authenticated={authenticated}/> : 
        <UnAuthenticatedApp authenticated={authenticated}/> 
        //<AuthenticatedApp authenticated={authenticated} setAuthenticated={setAuthenticated}/> : 
        //<UnAuthenticatedApp authenticated={authenticated} setAuthenticated={setAuthenticated}/>
      }
    </MainContainer>      
  )
}


// const PageNotFound = () => (
//   <div className='page-not-found'>
//     <br />
//     {/* <img id='not-found-image' src='https://monopolynb.s3.amazonaws.com/page-not-found.png' alt='page-not-found' /> */}
//     <h2>Page Not found</h2>
//   </div>
// )

export default Main