import { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { Modal } from '../../context/Modal';
import { getUsers, updateUserImage, updateUserDisplayName } from '../../store/session';
import LogoutButton from '../../components/0_Session/LogoutButton';
import './Navigation.css'
// todo ——————————————————————————————————————————————————————————————————————————————————
const UserDropDownForm = ({label, onSubmit, input, button}) => (
  <form onSubmit={onSubmit}>
    <label>{label}</label>
    <div className='row-list'>{input} {button} </div>
  </form>
)

const NavDropdown = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  const [imageLoading, setImageLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [display_name, setDisplay_name] = useState(sessionUser?.display_name);
  const [media_url, setMedia_url] = useState(sessionUser?.media_url === 'no image provided' ? '' : sessionUser?.media_url);

  const handleDisplay = async(e) => {
    e.preventDefault();
    const updatedName = await dispatch(updateUserDisplayName(display_name, sessionUser?.id));
    
    setCount(0);
    return !updatedName?.errors && setShowModal(false);
  }

  const handleImage = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('media_url', media_url);
    
    setImageLoading(true);
    const updatedImage = await dispatch(updateUserImage(formData, sessionUser?.id));
    
    setImageLoading(false);
    setMedia_url(sessionUser?.media_url);
    return !updatedImage?.errors && setShowModal(false);
  }
  
  const handleClose = () => {
    setDisplay_name(sessionUser?.display_name);
    setCount(0);
    return setShowModal(false);
  }
  
  const updateDisplayName = e => {
    setCount(count => count += 1);
    return setDisplay_name(e.target.value);
  }

  return (<>
    {sessionUser?.image_url === 'no image provided' ? 
      <div className='nav-user-image' onClick={e => setShowModal(true)}>
        {sessionUser?.display_name[0].toUpperCase()}</div>
      : 
      <img className='nav-user-image' src={sessionUser?.image_url} alt='user' style={{marginRight:'1em'}}
        onClick={e => setShowModal(true)}
    />}

    {showModal && <Modal providedId='nav-dropdown' providedContent={true} onClose={handleClose}>
      {<div className='dropdown-nav'>
        <div className='row-list' style={{alignItems:'center'}} >
          {sessionUser?.image_url === 'no image provided' ? <div className='nav-dropdown-image' >{sessionUser?.display_name[0].toUpperCase()}</div>
            : <img className='nav-dropdown-image' src={sessionUser?.image_url} alt='user' style={{marginRight:'1em'}}/>}
          <h3 className='nav-display-name'>{sessionUser?.display_name}</h3>
        </div>

        <UserDropDownForm label='Change Display Name' onSubmit={handleDisplay}
          input={<input placeholder={sessionUser?.display_name} value={display_name} onChange={updateDisplayName}></input>}
          button={<button className='user-dropdown-submit-button' id={count && display_name && 'send-it'} type="submit" disabled={!count || !display_name}>
            <img style={{width:'1.2em', height:'1.2em'}} src='https://capstone-slack-clone.s3.amazonaws.com/icons-gray/send.png' alt='icon' />
            </button>}/>

        <UserDropDownForm label='Set Profile Image' onSubmit={handleImage}
          input={<input style={{cursor:'pointer'}} type='file' accept='image/*' onChange={e => setMedia_url(e.target.files[0])}></input>}
          button={imageLoading ? <div>Uploading...</div> : <button className='user-dropdown-submit-button' id={media_url && 'send-it'} type="submit" disabled={!media_url}>
            <img style={{width:'1.2em', height:'1.2em'}} src='https://capstone-slack-clone.s3.amazonaws.com/icons-gray/send.png' alt='icon' />
            </button>}/>

        <LogoutButton />
      </div>}
    </Modal>
    }
  </>)
}

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getUsers()) }, [dispatch]);

  return (
    <div className='nav-bar'>
      <div id='left-nav'>
        <img
          className='navicon'
          onClick={() => history.push('/')}
          src='https://capstone-slack-clone.s3.amazonaws.com/favicon.ico' alt='custom' 
        />
      </div>
    
      <div id='mid-nav'>
        <Search/>
      </div>
    
      <div id='right-nav'>
        <NavDropdown />
      </div>
    </div>
  )
}



const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [showModal, setShowModal] = useState(false);

  const userstate = useSelector(state => state?.session)
  const channelstate = useSelector(state => state?.channel)
  const users = Object.values(userstate?.allUsers).filter(user => user.display_name.toLowerCase().includes(searchInput));
  const channels = Object.values(channelstate?.channels).filter(channel => channel.title.toLowerCase().includes(searchInput));

  useEffect(() => setShowModal(searchInput ? true : false), [searchInput])

  const clickChannel = () => {
    setShowModal(false);
    setSearchInput('');
    return;
  }

  return (
    <div>
      <input placeholder='Search TVHey' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>

      {showModal && <Modal providedId='nav-dropdown' providedContent={true} onClose={() => setShowModal(false)}>
        <div className='dropdown-nav'>
          <div className='col-list' >
            {searchInput && users?.map(user => <div key={user?.id} className='channel-list-item'>{user?.display_name}</div>)}
            {searchInput && channels?.map(channel => (
              <NavLink to={`/channels/${channel?.id}`} onClick={clickChannel} key={channel?.id} className='channel-list-item' activeStyle={{backgroundColor:'#EC8642', color: 'white', display: 'unset'}} >{channel?.privateStatus ? 'π' : '#'} {channel?.title}</NavLink>
            ))}
          </div>        
        </div>
      </Modal>}
    </div>
  )
}


export default Navigation;
