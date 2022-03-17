import {NavLink} from 'react-router-dom';
// import { useSelector } from 'react-redux';

import {Dropdown} from '../Utils/dropdown';
import LogoutButton from '../../components/0_Session/LogoutButton';

import './Navigation.css'

const Navigation = () => {
  // const sessionUser = useSelector(state => state.session.user);

  const NavBar = ({children}) => <nav className='nav-bar'>{children}</nav>
  const LeftNav = ({children}) => <div id='left-nav'>{children}</div>
  const MidNav = ({children}) => <div id='mid-nav'>{children}</div>
  const RightNav = ({children}) => <div id='right-nav'>{children}</div>

  return (
    <NavBar>
    <LeftNav>
      <NavLink to='/'>Home</NavLink>
    </LeftNav>

    <MidNav>
      <LogoutButton />
    </MidNav>

    <RightNav>
      <Dropdown/>
    </RightNav>
  </NavBar>
  )
}

export default Navigation;
