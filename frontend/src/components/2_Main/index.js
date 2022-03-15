import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect, useParams } from "react-router-dom";
// todo ——————————————————————————————————————————————————————————————————————————————————
import LoginForm from "../../components/0_Session/LoginForm";
import SignUpForm from "../../components/0_Session/SignUpForm";
import Navigation from '../1_Navigation/index';
import Footer from '../3_Footer/index';
import LeftNav from '../4_LeftNav';
import Chat from "../../components/Chat";

import { loginDemo } from '../../store/session';
import './Main.css'
// todo ——————————————————————————————————————————————————————————————————————————————————
// export const ListContainer = ({flexDirection='column', children, width='100%', height='100%'}) => <div style={{flexDirection, width, height}} className='list-container'>{children}</div>
export const ListContainer = ({id, children}) => <div id={id} className='list-container'>{children}</div>

export const UnAuthenticatedApp = () => {
  const dispatch = useDispatch();

  return (
    <div style={{width: '60%', marginLeft:'auto', marginRight:'auto'}}>
      <div>Sign In to TVHey</div>
      
      <ListContainer id='unauthenticated-header'>
        <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
        <button onClick={async() => await dispatch(loginDemo())}>Demo</button>
        <NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
      </ListContainer>

      <ListContainer id='main-page'>
        <Switch>
          <Route exact path="/login"><LoginForm /></Route>
          <Route exact path="/sign-up"><SignUpForm /></Route>
          <Route><Redirect to="/login" /></Route>
        </Switch>
      </ListContainer>
    </div>
  )
}
  
export const AuthenticatedApp = () => {
  // const [lastSite, setLastSite] = useState('');

  // const {channelId} = useParams()
  // console.log('MAIN PARAM', channelId)

  return (
    <div className='page-container'>
      <Navigation/>

      <ListContainer id='main-page'>
        <LeftNav />
      
      <ListContainer>
        <div className='main-header'>List Container!</div>
        <Switch>
          <Route exact path="/" ><div>MODAL WITH "HEY WELCOME TO SLACK START WRITING HERE!!"</div><button>CLICK ME TO START WRITING</button></Route>
          <Route exact path="/channels/:channelId" ><Chat /></Route>
          <Route><Redirect to='/channels/1' /></Route>
          {/* <Route><Redirect to={`/${lastSite}`} /></Route> */}
          {/* <Route><Redirect to='/' /></Route> */}
        </Switch>
      </ListContainer>
      </ListContainer>

      
      <Footer/>
    </div>
  )
}