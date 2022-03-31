import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Split from 'react-split';
// todo ——————————————————————————————————————————————————————————————————————————————————
// import Chap from './chat';
// todo ——————————————————————————————————————————————————————————————————————————————————
import AuthForm from "../0_Session/AuthForm";
import Navigation from '../1_Navigation/index';
import Chat from "../../components/Chat";
import ChannelFormModal from '../Channel/channel_modal';
import {Icon} from '../Utils/icons';
// todo ——————————————————————————————————————————————————————————————————————————————————
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
        <NavLink to="/login" exact={true} >Log In</NavLink>
        <NavLink to="/sign-up" exact={true}>Sign Up</NavLink>
        <div style={{color:'#EC8642', cursor:'pointer'}} onClick={async() => await dispatch(loginDemo())}>Demo</div>
      </div>

      <div className='row-list' id='main-page'>
        <Switch>
          <Route exact path="/login"><AuthForm /></Route>
          <Route exact path="/sign-up"><AuthForm signup={true} /></Route>
          <Route path='*' ><Redirect to="/login" /></Route>
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
      <Navigation />
      <Split className='row-list main-page'
        cursor="col-resize"
        direction="horizontal"
        minSize={270}
        sizes={[25, 75]}
        gutterSize={2}
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

  const [display, setDisplay] = useState(true)

  return (
    <div className='left-nav'>
      <div className='header' style={{justifyContent:'flex-end'}}>TVHey</div>
      <div style={{height:'200px'}}/>
      
      <div style={{paddingLeft: '.2em'}} className='row-list'>
        <Icon onClick={()=> setDisplay(!display)} iconName='expand'/>
        <h3 style={{paddingLeft:'1.2em', paddingRight: '1.2em'}} >Channels</h3>
      </div>

      <div className={`col-list channels-container ${display ? 'hide-channels' : ''}`}>
        {channels?.map(channel => (
          <NavLink to={`/channels/${channel?.id}`} key={channel?.id} className='channel-list-item' activeStyle={{backgroundColor:'#EC8642', color: 'white', display: 'unset'}} >{channel?.privateStatus ? 'π' : '#'} {channel?.title}</NavLink>
        ))}
      </div>
      <div style={{padding:'1.2em', paddingTop:'0'}}><ChannelFormModal name='+ Add Channel'/></div>

      <div className='row-list left-nav-about'>
        <AboutLink link='https://github.com/mdepree5' image='https://capstone-slack-clone.s3.amazonaws.com/github.png' />
        <AboutLink link='https://www.linkedin.com/in/mitch-depree-4a5686155/' image='https://capstone-slack-clone.s3.amazonaws.com/linkedin.png' />
      </div>
    </div>
  )
}

const AboutLink = ({link, image}) => (
  <img className='about' onClick={()=>window.open(link)} src={image} alt='about-link' />
)

const RightPage = ({socket}) => {

  return (
    <div className='right-page'>
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route exact path="/channels/:channelId" ><Chat socket={socket}/></Route>
        <Route path='*' ><Redirect to='/' /></Route>
      </Switch>
    </div>
  )
}

const Home = () => {

  return (
    <div className='home'>
      <div className='header'></div>
      <div style={{height:'200px'}}/>

      <div className='home-screen col-list'>
        <strong>Welcome to TVHey</strong>
        a multiversal communication platform
        <ChannelFormModal name='Make a new channel' />
      </div>
    </div>
  )
}