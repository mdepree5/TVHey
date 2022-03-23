import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import ReactSlider from "react-slider";
// todo ——————————————————————————————————————————————————————————————————————————————————
import { Modal } from '../../context/Modal';
import { updateUserImage, updateUserDisplayName } from '../../store/session';
import LogoutButton from '../../components/0_Session/LogoutButton';
import './Navigation.css'
// import { bindActionCreators } from 'redux';
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
    await dispatch(updateUserDisplayName(display_name, sessionUser?.id));
    
    setCount(0);
    setShowModal(false);
  }

  const handleImage = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('media_url', media_url);
    
    setImageLoading(true);
    const back = await dispatch(updateUserImage(formData, sessionUser?.id));

    setImageLoading(false);
    setMedia_url(sessionUser?.media_url);
    return !back?.errors && setShowModal(false);
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

    {showModal &&
      <Modal providedId='nav-dropdown' providedContent={true} onClose={handleClose}>
        {<div className='dropdown-nav'>
          <div className='row-list' style={{alignItems:'center'}} >
            {sessionUser?.image_url === 'no image provided' ? 
              <div className='nav-user-image' >{sessionUser?.display_name[0].toUpperCase()}</div>
              :
              <img className='nav-user-image' src={sessionUser?.image_url} alt='user' style={{marginRight:'1em'}}/>
            }
            <h3 className='nav-display-name'>{sessionUser?.display_name}</h3>
          </div>

          <UserDropDownForm label='Change Display Name' onSubmit={handleDisplay}
            input={<input placeholder={sessionUser?.display_name} value={display_name} onChange={updateDisplayName}></input>}
            button={<button className={!display_name || !count ? 'default-cursor' : ''} disabled={!display_name || !count} type='submit' >{'>>>'}</button>}
          />

          <UserDropDownForm label='Set Profile Image' onSubmit={handleImage}
            input={<input style={{cursor:'pointer'}} type='file' accept='image/*' onChange={e => setMedia_url(e.target.files[0])}></input>}
            button={imageLoading ? <div>Uploading...</div> : <button className={!media_url ? 'default-cursor' : ''} disabled={!media_url} type='submit'>{'>>>'}</button>}
          />

          <LogoutButton />
        </div>}
      </Modal>
    }
  </>)
}

const Navigation = () => {
  const history = useHistory();
  
  const bod = document.getElementById('body');
  console.log(`%c bod:`, `color:yellow`, bod)
  console.log(`%c bod:`, `color:yellow`, bod.style)
  console.log(`%c bod:`, `color:yellow`, bod.style.fontSize)


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
        <button onClick={()=> bod.style.fontSize='32px'}>Change to 32</button>
        <button onClick={()=> bod.style.fontSize='16px'}>Change to 16</button>
        {/* <SizeSlider /> */}
        <About />
      </div>
    
      <div id='right-nav'>
        <NavDropdown />
      </div>
    </div>
  )
}





const About = () => (
  <div>
    <a href='https://github.com/mdepree5' target='_blank' rel='noreferrer'><img className='about'  src='https://capstone-slack-clone.s3.amazonaws.com/github.png' alt='github' /> </a>
    <a href='https://www.linkedin.com/in/mitch-depree-4a5686155/' target='_blank' rel='noreferrer'><img className='about'  src='https://capstone-slack-clone.s3.amazonaws.com/linkedin.png' alt='linked' /> </a>
  </div>
  
)


export default Navigation;
