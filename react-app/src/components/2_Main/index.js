import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Split from 'react-split';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import AuthForm from "../0_Session/AuthForm";
import Navigation from '../1_Navigation/index';
import Chat from "../../components/Chat";
import ChannelFormModal from '../Channel/channel_modal';
import {Icon} from '../Utils/icons';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import { createChannel, getChannels, updateChannel, deleteChannel } from '../../store/channelSocket';
import { createDM, getDMs } from '../../store/channelSocket';
import { loginDemo } from '../../store/session';
import './Main.css'
// ???? ——————————————————————————————————————————————————————————————————————————————————

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               UnAuthenticated App
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
  


// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Authenticated App
// todo ——————————————————————————————————————————————————————————————————————————————————
export const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  const socket =  useSelector(state => state?.socket?.socket);
  // useEffect(() => { dispatch(getChannels()) }, [dispatch]);

  useEffect(() => {
    if(socket){
      socket.emit('get channels')
      socket.on('get all channels', async(channels) => {
        const channelsArr = [];
        channels.all_channels.forEach(channel => channelsArr.push(JSON.parse(channel)))
        await dispatch(getChannels(channelsArr))
      })
      
      socket.emit('get dms', sessionUser?.id)
      socket.on('get all dms', async(dms) => {
        const dmsArr = [];
        dms.all_dms.forEach(dm => dmsArr.push(JSON.parse(dm)))
        await dispatch(getDMs(dmsArr))
      })

      socket.on('channel to front', channel => dispatch(createChannel(JSON.parse(channel))))
      socket.on('edited channel to front', channel => dispatch(updateChannel(JSON.parse(channel))))
      socket.on('deleted channel to front', id => dispatch(deleteChannel(id)))
      socket.on('dm to front', dm => dispatch(createDM(JSON.parse(dm))))
    }
  }, [dispatch, socket])


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

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Left Nav
// todo ——————————————————————————————————————————————————————————————————————————————————
const LeftNav = () => {
  // const channelstate = useSelector(state => state?.channel);
  const channelstate = useSelector(state => state?.channelSocket);
  const userstate = useSelector(state => state?.session);

  const channels = Object.values(channelstate?.channels);
  const dms = Object.values(userstate?.allUsers);

  const [displayChannels, setDisplayChannels] = useState(channels?.length < 8);
  const [display, setDisplay] = useState(channels?.length < 8);


  return (
    <div className='left-nav'>
      <div className='header' style={{justifyContent:'flex-end'}}>TVHey</div>
      <div style={{height:'200px'}}/>
      
      <div style={{paddingLeft: '.2em'}} className='row-list'>
        <Icon onClick={()=> setDisplayChannels(!displayChannels)} iconName='expand'/>
        <h3 style={{paddingLeft:'1.2em', paddingRight: '1.2em'}} >Channels</h3>
      </div>

      <div className={`col-list channels-container ${displayChannels ? '' : 'hide-channels'}`}>
        {channels?.map(channel => (
          <NavLink to={`/channels/${channel?.id}`} key={channel?.id} className='channel-list-item' activeStyle={{backgroundColor:'#EC8642', color: 'white', display: 'unset'}} >{channel?.privateStatus ? 'π' : '#'} {channel?.title}</NavLink>
        ))}
      </div>
      
      <div style={{padding:'1.2em', paddingTop:'0'}}><ChannelFormModal name='+ Add Channel'/></div>

      <br />
      
      <div style={{paddingLeft: '.2em'}} className='row-list'>
        <Icon onClick={()=> setDisplay(!display)} iconName='expand'/>
        <h3 style={{paddingLeft:'1.2em', paddingRight: '1.2em'}} >Direct messages </h3>
      </div>

      <div className={`col-list channels-container ${display ? '' : 'hide-channels'}`}>
        {dms?.map(dm => (
            <NavLink to={`/dms/${dm?.id}`} key={dm?.id} className='channel-list-item' activeStyle={{backgroundColor:'#EC8642', color: 'white', display: 'unset'}} >{dm?.privateStatus ? 'π' : '#'} {dm?.display_name} {'X'}
            {/*
              On hover display the 'X' for a given direct message
              May need to create an element similar to how message edit-delete buttons are set up in messages
              Will probably have a component for dm routing that will create a unique id for each session user and current user?
            */}
            </NavLink>
        ))}
      </div>

      <div className='row-list left-nav-about'>
        <AboutLink link='https://github.com/mdepree5' image='https://capstone-slack-clone.s3.amazonaws.com/github.png' />
        <AboutLink link='https://www.linkedin.com/in/mitch-depree-4a5686155/' image='https://capstone-slack-clone.s3.amazonaws.com/linkedin.png' />
      </div>
      <br />
      <br />
    </div>
  )
}

const AboutLink = ({link, image}) => <img className='about' onClick={()=>window.open(link)} src={image} alt='about-link' />
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Right Page
// todo ——————————————————————————————————————————————————————————————————————————————————
const RightPage = () => {

  return (
    <div className='right-page'>
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route exact path="/channels/:channelId" ><Chat/></Route>
        <Route exact path="/dms/:dmId" ><Chat dm={true}/></Route>
        <Route path='*' ><Redirect to='/' /></Route>
      </Switch>
    </div>
  )
}

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Home
// todo ——————————————————————————————————————————————————————————————————————————————————
const Home = () => (
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
