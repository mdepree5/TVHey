import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { Modal } from '../../context/Modal';
import { updateUserImage, updateUserDisplayName } from '../../store/session';
import LogoutButton from '../../components/0_Session/LogoutButton';
import './Navigation.css'
// todo ——————————————————————————————————————————————————————————————————————————————————
const UserDropDownForm = ({label, onSubmit, input, button}) => (
  <form onSubmit={onSubmit}>
    <label>{label}</label>
    <div className='row-list'>{input} {button} </div>
  </form>
)

const NavDropdown = ({socket}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  const channelId = useSelector(state => state?.channel?.selected?.id);
  const [imageLoading, setImageLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [display_name, setDisplay_name] = useState(sessionUser?.display_name);
  const [media_url, setMedia_url] = useState(sessionUser?.media_url === 'no image provided' ? '' : sessionUser?.media_url);
  
  // const state = useSelector(state => state);
  // console.log(`%c state:`, `color:yellow`, state)

  const handleDisplay = async(e) => {
    e.preventDefault();
    const updatedName = await dispatch(updateUserDisplayName(display_name, sessionUser?.id));
    
    socket.emit('get messages', channelId)
    setCount(0);
    return !updatedName?.errors && setShowModal(false);
  }

  const handleImage = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('media_url', media_url);
    
    setImageLoading(true);
    const updatedImage = await dispatch(updateUserImage(formData, sessionUser?.id));
    socket.emit('get messages', channelId);
    
    setImageLoading(false);
    setMedia_url(sessionUser?.media_url);
    return !updatedImage?.errors && setShowModal(false);
  }
  
  const handleClose = () => {
    setDisplay_name(sessionUser?.display_name);
    setCount(0);
    setShowModal(false);
  }
  
  const updateDisplayName = e => {
    setCount(count => count += 1);
    setDisplay_name(e.target.value);
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

const Navigation = ({socket}) => {
  const history = useHistory();

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
        {/* <AboutLink link='https://github.com/mdepree5' image='https://capstone-slack-clone.s3.amazonaws.com/github.png' />
        <AboutLink link='https://www.linkedin.com/in/mitch-depree-4a5686155/' image='https://capstone-slack-clone.s3.amazonaws.com/linkedin.png' /> */}
      </div>
    
      <div id='right-nav'>
        <NavDropdown socket={socket}/>
      </div>
    </div>
  )
}





// const AboutLink = ({link, image}) => (
//   <img className='about' onClick={()=>window.open(link)} src={image} alt='about-link' />
// )


export default Navigation;
