import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Dropdown} from '../Utils/dropdown';
import LogoutButton from '../../components/0_Session/LogoutButton';

import './Navigation.css'

const Navigation = () => {
  const sessionUser = useSelector(state => state?.session?.user);

  return (
    <div className='nav-bar'>
      <div id='left-nav'>
        <NavLink to='/'>Home</NavLink>
      </div>
    
      <div id='mid-nav'>
        <LogoutButton />
      </div>
    
      <div id='right-nav'>
        <Dropdown sessionUser={sessionUser} />
      </div>
    </div>
  )
}

export default Navigation;
