import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Split from 'react-split';
// todo ——————————————————————————————————————————————————————————————————————————————————
import AuthForm from "../0_Session/AuthForm";

import Navigation from '../1_Navigation/index';
import Chat from "../../components/Chat";
import ChannelFormModal from '../Channel/channel_modal';

import {getChannels} from '../../store/channel';
import {loginDemo} from '../../store/session';
import './Main.css'
// todo ——————————————————————————————————————————————————————————————————————————————————

export const UnAuthenticatedApp = () => {
  const dispatch = useDispatch();

  return (
    <div className='page-container' id='unauthenticated-app' >
      <h2>Sign In to TVHey</h2>
      
      <div className='row-list' id='unauthenticated-header'>
        <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
        <button onClick={async() => await dispatch(loginDemo())}>Demo</button>
        <NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
      </div>

      <div className='row-list' id='main-page'>
        <Switch>
          <Route exact path="/login"><AuthForm /></Route>
          <Route exact path="/sign-up"><AuthForm signup={true} /></Route>
          <Route><Redirect to="/login" /></Route>
        </Switch>
      </div>
    </div>
  )
}
  
export const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getChannels()) }, [dispatch]);

  return (
    <div className='page-container'>
      <Navigation/>
      <Split className='row-list main-page'
        cursor="col-resize"
        direction="horizontal"
        minSize={180}
        sizes={[25, 75]}
        gutterSize={3}
        dragInterval={2}
        snapOffset={20}
      >
        <LeftNav />
        <RightPage />
      </Split>
    </div>
  )
}


const LeftNav = () => {
  const channelstate = useSelector(state => state?.channel);
  const channels = Object.values(channelstate?.channels);

  return (
    <div className='left-nav'>
      <div className='header' style={{justifyContent:'flex-end'}}>TVHey</div>
      <div style={{height:'100px'}}/>
      <div style={{height:'100px'}}/>

      <div className='col-list'>
        <h3 style={{paddingLeft:'1.2em', paddingRight: '1.2em'}} >Channels</h3>
        {channels?.map(channel => (
          <NavLink to={`/channels/${channel?.id}`} key={channel?.id} className='channel-list-item' activeStyle={{backgroundColor:'#e8912d', color: 'white'}} >{channel?.privateStatus ? 'π' : '#'} {channel?.title}</NavLink>
        ))}
        <div style={{paddingLeft:'1.2em', paddingRight: '1.2em'}}><ChannelFormModal name='+ Add Channel' /></div>
      </div>
    </div>
  )
}

const RightPage = () => {

  return (
    <div className='right-page'>
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route exact path="/channels/:channelId" ><Chat /></Route>
        <Route><Redirect to='/' /></Route>
      </Switch>
    </div>
  )
}

const Home = () => (
  <div className='home'>
    <div className='header'></div>
    <div style={{height:'100px'}}/>
    <div style={{height:'100px'}}/>
    
    <div className='home-screen col-list'>
      <strong>Welcome to TVHey</strong>
      a multiversal communication platform
      <ChannelFormModal name='Make a new channel' />
    </div>
  </div>
)

// <Route><Redirect to={`/${lastSite}`} /></Route>
// <Route><Redirect to='/' /></Route>