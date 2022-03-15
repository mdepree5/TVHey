import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, NavLink, Redirect, useParams } from "react-router-dom";
// todo ——————————————————————————————————————————————————————————————————————————————————
import LoginForm from "../../components/0_Session/LoginForm";
import SignUpForm from "../../components/0_Session/SignUpForm";
import Navigation from '../1_Navigation/index';
// import LeftNav from '../4_LeftNav';
import Chat from "../../components/Chat";

import { loginDemo } from '../../store/session';
import './Main.css'
// todo ——————————————————————————————————————————————————————————————————————————————————

export const UnAuthenticatedApp = () => {
  const dispatch = useDispatch();

  return (
    <div style={{width: '60%', marginLeft:'auto', marginRight:'auto'}}>
      <div style={{height:'100px'}}></div>
      <div>Sign In to TVHey</div>
      
      <div className='row-list' id='unauthenticated-header'>
        <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
        <button onClick={async() => await dispatch(loginDemo())}>Demo</button>
        <NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
      </div>

      <div className='row-list' id='main-page'>
        <Switch>
          <Route exact path="/login"><LoginForm /></Route>
          <Route exact path="/sign-up"><SignUpForm /></Route>
          <Route><Redirect to="/login" /></Route>
        </Switch>
      </div>
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
      <div className='main-page row-list'>
        <LeftNav />
        <RightPage />
      </div>
    </div>
  )
}

const RightPage = () => (
  <div className='main-container'>
    <div className='main-header'>List Container!</div>
    <div className='main-body'>
      <Switch>
        <Route exact path="/" ><div>MODAL WITH "HEY WELCOME TO SLACK START WRITING HERE!!"</div><button>CLICK ME TO START WRITING</button></Route>
        <Route exact path="/channels/:channelId" ><Chat /></Route>
        <Route><Redirect to='/channels/1' /></Route>
        {/* <Route><Redirect to={`/${lastSite}`} /></Route> */}
        {/* <Route><Redirect to='/' /></Route> */}
      </Switch>
    </div>
  </div>
)

const channels = [
  {id: 1, privateStatus: false, name: '2021-10-18-online'},
  {id: 2, privateStatus: false, name: '2021-10-18-online-lecture-questions'},
  {id: 3, privateStatus: true, name: 'python-group-8-october'},
]

const privateSymbol = privateStatus => privateStatus ? 'π' : '#'

const AddButton = ({name, symbolOnly=false, width='50%'}) => <button style={{width}} onClick={()=>alert(`Open create new ${name} form`)}>+ {symbolOnly ? '' : ` Add ${name}`}</button>
const DropButton = ({width='50%'}) => <button style={{width}} onClick={() => alert('Show/Hide')}>v</button>

export const ContainerHeader = ({flexDirection='row', children}) => <div style={{flexDirection}} className='container-header'>{children}</div>
export const ContainerBody = ({flexDirection='column', children}) => <div style={{flexDirection}} className='container-body'>{children}</div>

const LeftNav = () => {
  return (
    <div className='left-nav'>
      <div className='main-header'>List Header! <button>New</button></div>
      <div style={{height:'100px'}}></div>
      <div style={{height:'100px'}}></div>

      <div className='col-list'>
        <ContainerHeader>
          <div>Channels _______</div>
          <DropButton width='5%'/>
        </ContainerHeader>

        <ContainerBody>
          {channels.map(channel => (
            <NavLink to={`/channels/${channel?.id}`} key={channel?.id} activeClassName='active' >
              {privateSymbol(channel?.privateStatus)} {channel?.name}
            </NavLink>
          ))}
          <AddButton name='Channel'/>
        </ContainerBody>
      </div>
    </div>
  )
}

export default LeftNav;