import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Split from 'react-split';
// todo ——————————————————————————————————————————————————————————————————————————————————
// import Chap from './chat';
import { io } from 'socket.io-client';
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
        <Route><Redirect to='/' /></Route>
      </Switch>
    </div>
  )
}

const Home = () => {
  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // let socket;
  // const domain = (process.env.NODE_ENV === 'production') ? '/api' : '';
  // const domain = '';
  // const domain = (process.env.NODE_ENV === 'production') ? 'https://tvhey.herokuapp.com/' : '';
  
  let socket
  const openConnection = () => {
    socket = io();

    socket.on("connect", () => {
      console.log(`%c Socket connected`, `color:#00ff44`, socket)
      console.log('%c socket.connected', 'color:#00ff44', socket.connected); // true
      console.log('%c socket.disconnected', 'color:#00ff44', socket.disconnected); // false
    });
    
    // socket.on('response', response => console.log(`%c Front end connection:`, `color:#00ff44`, response));
  }
  
  const closeConnection = () => {
    socket.disconnect()
    console.log(`%c Socket disconnected`, `color:red`, socket)
    console.log('%c socket.connected', 'color:red', socket.connected); // false
    console.log('%c socket.disconnected', 'color:red', socket.disconnected); // true
  }



  // const dayjs = require('dayjs');
  // socket.on('all_channels', all_channels => {
  //   all_channels.all_channels.forEach(channel => {
  //     const parsed = JSON.parse(channel)
  //     console.log('format date', dayjs(parsed?.created_at).format('h:mm A'))
  //   })
  // });

  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


  return (
    <div className='home'>
      <div className='header'></div>
      <div style={{height:'200px'}}/>

      <button onClick={openConnection}>Open Socket</button>
      <button onClick={closeConnection}>Close Socket</button>

      <div className='home-screen col-list'>
        <strong>Welcome to TVHey</strong>
        a multiversal communication platform
        <ChannelFormModal name='Make a new channel' />
      </div>
    </div>
  )
}