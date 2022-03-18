import {useEffect, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
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
      className='nav-user-image'
      onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}
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
  const history = useHistory();

  return (
    <div className='nav-bar'>
      <div id='left-nav'>
        <img
          className='icon'
          onClick={() => history.push('/')}
          src='https://capstone-slack-clone.s3.amazonaws.com/favicon.ico' alt='custom' 
        />
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
