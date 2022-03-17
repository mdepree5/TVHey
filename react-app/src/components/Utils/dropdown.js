import {useEffect, useState} from 'react';
import './utils.css';

export const Dropdown = () => {

  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(()=> setShowDropdown(false), []);
  useEffect(()=> setShowDropdown(false), [showDropdown]);


  return (
    <>
      <button onCLick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}>
        USER
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
