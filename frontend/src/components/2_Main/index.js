import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Split from 'react-split';
// todo ——————————————————————————————————————————————————————————————————————————————————
import AuthForm from "../0_Session/AuthForm";

import Navigation from '../1_Navigation/index';
import Chat from "../../components/Chat";

import {getChannels} from '../../store/channel';
import {loginDemo} from '../../store/session';
import './Main.css'
// todo ——————————————————————————————————————————————————————————————————————————————————

export const UnAuthenticatedApp = () => {
  const dispatch = useDispatch();

  return (
    <div className='page-container' id='unauthenticated-app' >
      <div>Sign In to TVHey</div>
      
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
  useEffect(() => {(async() => await dispatch(getChannels()))()}, [dispatch]);
  // useEffect(() => { dispatch(getChannels()) }, [dispatch]);

  return (
    <div className='page-container'>
      <Navigation/>
      <Split className='main-page row-list'
        cursor="row-resize"
        direction="horizontal"
        sizes={[25, 75]}
        gutterSize={2}
        dragInterval={1}
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

  console.log('LEFT NAV CHANNELSARR', channels);

  const AddButton = ({name, symbolOnly=false, width='50%'}) => <button style={{width}} onClick={()=>alert(`Open create new ${name} form`)}>+ {symbolOnly ? '' : ` Add ${name}`}</button>

  return (
    <div className='left-nav'>
      <div className='header'>TVHey <button>New</button></div>
      <div style={{height:'100px'}}/>
      <div style={{height:'100px'}}/>

      <div className='col-list'>
        <button onClick={() => alert('Show/Hide')}>{'v>'} Channels</button>

        <div className='col-list'>
          {channels?.map(channel => (
            <NavLink to={`/channels/${channel?.id}`} key={channel?.id} activeStyle={{backgroundColor:'darkblue', color: 'white'}} >
              {channel?.privateStatus ? 'π' : '#'} {channel?.title}
            </NavLink>
          ))}
          <AddButton name='Channel' width='100%'/>
        </div>
      </div>
    </div>
  )
}

const RightPage = () => {

  return (
    <div className='right-page'>
      <Switch>
        <Route exact path="/" ><PseudoHome/></Route>
        <Route exact path="/channels/:channelId" ><Chat /></Route>
        <Route><Redirect to='/' /></Route>
        {/* <Route><Redirect to='/channels/1' /></Route> */}
      </Switch>
    </div>
  )
}

const PseudoHome = () => (
  <div style={{width: '50%', border: 'solid 2px pink'}}>
    MODAL WITH "HEY WELCOME TO SLACK START WRITING HERE!!"
    <button>CLICK ME TO START WRITING</button>
  </div>
)

// <Route><Redirect to={`/${lastSite}`} /></Route>
// <Route><Redirect to='/' /></Route>