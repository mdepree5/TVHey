import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import HomeIcon from './1_HomeIcon';
import Search from './2_Search';
import NavDropdown from './3_NavDropDown';

import {getUsers} from '../../store/session';
import './Navigation.css'
// ???? ——————————————————————————————————————————————————————————————————————————————————

const Navigation = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getUsers()) }, [dispatch]);

  return (
    <div className='nav-bar'>
      <div id='left-nav'><HomeIcon/></div>
    
      <div id='mid-nav'><Search/></div>
    
      <div id='right-nav'><NavDropdown/></div>
    </div>
  )
}

export default Navigation;
