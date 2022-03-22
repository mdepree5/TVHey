// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Split from 'react-split';
// todo ——————————————————————————————————————————————————————————————————————————————————
// import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————
import AuthForm from "../0_Session/AuthForm";
import Navigation from '../1_Navigation/index';
import Chat from "../../components/Chat";
import ChannelFormModal from '../Channel/channel_modal';
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
  // const dayjs = require('dayjs');
  // let socket;
  // const domain = (process.env.NODE_ENV === 'production') ? '/api' : '';
  // const domain = '';
  // const domain = (process.env.NODE_ENV === 'production') ? 'https://tvhey.herokuapp.com/' : '';

  // socket = io(domain);
  // console.log(`%c socket:`, `color:yellow`, socket)
  // socket = io();
  // console.log('authenticated app', socket)
  
  // socket.on('response', response => console.log('frontend connection', response));
  // socket.on('all_channels', all_channels => console.log('all_channels', all_channels));
  // socket.on('all_channels', all_channels => {
  //   console.table(all_channels.all_channels)
  //   all_channels.all_channels.forEach(channel => {
  //     const parsed = JSON.parse(channel)
  //     // console.log('one channel', parsed)
  //     // console.log('created at', parsed?.created_at)
  //     console.log('format date', dayjs(parsed?.created_at).format('h:mm A'))
  //   })
  // });


  // socket.on('all_users', all_users => console.log('frontend all users', all_users));

    // socket.on('chat', message => dispatch(createMessage(message)));
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getChannels()) }, [dispatch]);

  // const [bool, setBool] = useState(true)

  // const handleHelp = () => {
  //   // console.log(`%c bool: ${bool}`, `color:yellow`)
  //   // setBool(!bool)
  // }
  return (
    <div className='page-container'>
      {/* <button onClick={handleHelp} >Help</button> */}
      <Navigation />
      <Split className='row-list main-page'
        cursor="col-resize"
        direction="horizontal"
        minSize={180}
        sizes={[25, 75]}
        // sizes={bool ? [25, 65, 10] : [25, 75]}
        gutterSize={2}
        dragInterval={2}
        snapOffset={20}
      >
        <LeftNav />
        <RightPage />
        {/* {bool && <div>HEY</div>} */}
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
          <NavLink to={`/channels/${channel?.id}`} key={channel?.id} className='channel-list-item' activeStyle={{backgroundColor:'#EC8642', color: 'white'}} >{channel?.privateStatus ? 'π' : '#'} {channel?.title}</NavLink>
        ))}
        <div style={{paddingLeft:'1.2em', paddingRight: '1.2em'}}><ChannelFormModal name='+ Add Channel'/></div>
      </div>
    </div>
  )
}

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