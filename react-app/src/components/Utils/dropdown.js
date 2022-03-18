import {useEffect, useState} from 'react';
import './utils.css';

export const NavDropdown = ({sessionUser}) => {
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
      style={{height:'2em', width:'2em', borderRadius:'0.4em', cursor:'pointer' }}
      src={sessionUser?.image_url} alt='user'
    />

    {showDropdown && (
      <div className='dropdown-nav'>
        <div>{sessionUser?.display_name}</div>
        <input placeholder={sessionUser?.display_name}></input>
        <input placeholder='User image url'></input>
        <div>Logout Button</div>
      </div>
    )}
  </>)
}
