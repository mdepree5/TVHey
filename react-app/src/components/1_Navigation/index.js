import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { updateUserImage, updateUserDisplayName } from '../../store/session';
import LogoutButton from '../../components/0_Session/LogoutButton';
import './Navigation.css'
// todo ——————————————————————————————————————————————————————————————————————————————————

const NavDropdown = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  const [imageLoading, setImageLoading] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [display_name, setDisplay_name] = useState(sessionUser?.display_name);
  const [media_url, setMedia_url] = useState(sessionUser?.media_url === 'no image provided' ? '' : sessionUser?.media_url);


  useEffect(()=> {
    if (!showDropdown) return;
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener('click', closeDropdown)
    document.removeEventListener('click', closeDropdown)
  }, [showDropdown]);

  const handleDisplay = async(e) => {
    e.preventDefault();
    await dispatch(updateUserDisplayName(display_name, sessionUser?.id));
    // history.push()

    setShowDropdown(false);
  }

  const handleImage = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('media_url', media_url);
    
    setImageLoading(true);
    const back = await dispatch(updateUserImage(formData, sessionUser?.id));
    setImageLoading(false);
    return !back?.errors && setShowDropdown(false);
  }
  
  const closeDropdown = () => {
    setDisplay_name(sessionUser?.display_name);
    setShowDropdown(false);
  }


  return (<>
    {sessionUser?.image_url === 'no image provided' ? 
      <div className='nav-user-image' 
        onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}
      >{sessionUser?.display_name[0].toUpperCase()}</div> : 
      <img className='nav-user-image'
        src={sessionUser?.image_url} alt='user' style={{marginRight:'1em'}}
        onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}
      />
    }

    {showDropdown && (
      <div className='dropdown-nav'>
        <div className='row-list' style={{alignItems:'center'}} >
          {sessionUser?.image_url === 'no image provided' ? 
            <div className='nav-user-image' >{sessionUser?.display_name[0].toUpperCase()}</div> : 
            <img className='nav-user-image' src={sessionUser?.image_url} alt='user' style={{marginRight:'1em'}}/>
          }
          <h3>{sessionUser?.display_name}</h3>
          <button className='dropdown-cancel' onClick={closeDropdown}>X</button>
        </div>
        <form onSubmit={handleDisplay}>
          <label>Change Display Name</label>
          <input placeholder={sessionUser?.display_name} value={display_name} onChange={e=> setDisplay_name(e.target.value)}></input>
          <button type='submit'>Set Display Name</button>
        </form>
        <form onSubmit={handleImage}>
          <label>Set Profile Image</label>
          <input placeholder='User image url' type='file' accept='image/*' onChange={e => setMedia_url(e.target.files[0])}></input>
          {imageLoading ? 
            <div>Uploading...</div> :
            <button type='submit'>Set Profile Image</button>
          }
        </form>
        <LogoutButton />
      </div>
    )}
  </>)
}

const Navigation = () => {
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
        <NavDropdown />
      </div>
    </div>
  )
}

export default Navigation;
