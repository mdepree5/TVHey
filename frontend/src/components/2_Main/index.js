import { useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
// todo ——————————————————————————————————————————————————————————————————————————————————
import LoginForm from "../../components/0_Session/LoginForm";
import SignUpForm from "../../components/0_Session/SignUpForm";
import ProtectedRoute from "../../components/0_Session/ProtectedRoute";
import Navigation from '../1_Navigation/index';
import Footer from '../3_Footer/index';
import Chat from "../../components/Chat";

import { loginDemo } from '../../store/session';

import LeftNav from '../4_LeftNav';
// todo ——————————————————————————————————————————————————————————————————————————————————
import './Main.css'

export const ListContainer = ({flexDirection='column', children, width='100%', height='100%'}) => <div style={{flexDirection, width, height}} className='list-container'>{children}</div>

export const UnAuthenticatedApp = () => {
  const dispatch = useDispatch();

  return (
    <div style={{width: '60%', marginLeft:'100%', marginRight:'100%'}}>
      <div>Sign In to TVHey</div>
      
      <ListContainer flexDirection='row' height='40px'>
        <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
        <NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
        <button onClick={async() => await dispatch(loginDemo())}>Demo</button>
      </ListContainer>

      <ListContainer>
        <Switch>
          <Route exact path="/login"><LoginForm /></Route>
          <Route exact path="/sign-up"><SignUpForm /></Route>
          <Route path="*"><Redirect to="/login" /></Route>
        </Switch>
      </ListContainer>
    </div>
  )
}
  
export const AuthenticatedApp = () => (
    <>
      <Navigation/>

      <ListContainer flexDirection='row'>
        <LeftNav />
      
      <ListContainer>
        <div style={{color: 'red', padding:'10px', border: '2px solid red'}}>List Container!</div>
        <Switch>
          <ProtectedRoute exact path="/" ><div>MODAL WITH "HEY WELCOME TO SLACK START WRITING HERE!!"</div><button>CLICK ME TO START WRITING</button></ProtectedRoute>
          <ProtectedRoute exact path="/Lists/:ListId" ><div>Load List Here</div><Chat/></ProtectedRoute>
          <Route><Redirect to='/' /></Route>
        </Switch>


      
      </ListContainer>
      </ListContainer>
      <Footer/>
    </>
  )