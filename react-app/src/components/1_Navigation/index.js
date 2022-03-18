import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import LogoutButton from '../../components/0_Session/LogoutButton';
import './Navigation.css'
// todo ——————————————————————————————————————————————————————————————————————————————————

const NavDropdown = ({sessionUser}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(()=> {
    if (!showDropdown) return;
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener('click', closeDropdown)
    document.removeEventListener('click', closeDropdown)
  }, [showDropdown]);


  return (<>
    <img
      onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}
      className='nav-user-image'
      src={sessionUser?.image_url} alt='user'
    />

    {showDropdown && (
      <div className='dropdown-nav'>
        <div>{sessionUser?.display_name}</div>
        <input placeholder={sessionUser?.display_name}></input>
        <input placeholder='User image url'></input>
        <LogoutButton />
      </div>
    )}
  </>)
}

const Navigation = () => {
  const sessionUser = useSelector(state => state?.session?.user);

  return (
    <div className='nav-bar'>
      <div id='left-nav'>
        <NavLink to='/'>Home</NavLink>
      </div>
    
      <div id='mid-nav'>
      </div>
    
      <div id='right-nav'>
        <NavDropdown sessionUser={sessionUser} />
      </div>
    </div>
  )
}

export default Navigation;
