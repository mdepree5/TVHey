import {useEffect, useState} from 'react';
import './utils.css';

export const Dropdown = () => {

  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(()=> setShowDropdown(false), []);
  useEffect(()=> {
    if (!showDropdown) return;
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener('click', closeDropdown)
    document.removeEventListener('click', closeDropdown)
  }, [showDropdown]);


  return (
    <>
      <button onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}>
        User
      </button>
      {showDropdown && (
        <div className='dropdown'>
          <div>Hello</div>
          <div>World</div>
          <input placeholder='User display name'></input>
          <input placeholder='User image url'></input>
          <div>Logout Button</div>
        </div>
      )}
    </>

  )
}
