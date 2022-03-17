import {useEffect, useState} from 'react';
import './utils.css';

export const Dropdown = ({sessionUser}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(sessionUser)
  // useEffect(()=> setShowDropdown(false), []);
  useEffect(()=> {
    if (!showDropdown) return;
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener('click', closeDropdown)
    document.removeEventListener('click', closeDropdown)
  }, [showDropdown]);


  return (
    <>
      {/* <button onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}>
      </button> */}
      <img
        onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}
        style={{height:'2em', width:'2em', borderRadius:'0.4em', cursor:'pointer' }}
        src={sessionUser?.image_url} alt='user'
      />
      {showDropdown && (
        <div className='dropdown'>
          <div>{sessionUser?.display_name}</div>
          <input placeholder={sessionUser?.display_name}></input>
          <input placeholder='User image url'></input>
          <div>Logout Button</div>
        </div>
      )}
    </>

  )
}
