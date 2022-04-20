import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from 'react-router-dom';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import {Icon} from '../Utils/icons';
import { Modal } from '../../context/Modal';
import ChannelFormModal from '../Channel/channel_modal';
import './Chat.css';
// ???? ——————————————————————————————————————————————————————————————————————————————————

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               1. Chat Header
// todo ——————————————————————————————————————————————————————————————————————————————————
const ChatHeader = ({socket, thisChannel, channelId, sessionUser}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);



  const handleDelete = async () => {
    socket.emit('delete channel', Number(channelId))
    return history.push('/');
  }
  
  const userstate = useSelector(state => state?.session)
  const [searchInput, setSearchInput] = useState('')
  const users = Object.values(userstate?.allUsers).filter(user => user.display_name.toLowerCase().includes(searchInput));
  const dayjs = require('dayjs');
  const [channelInfo, setChannelInfo] = useState('about')
  
  const closeChannelModal = () => {
    setChannelInfo('about');
    setToggleEdit(false);
    setShowModal(false);
  }


  const [toggleEdit, setToggleEdit] = useState(false);
  const [topic, setTopic] = useState('');

  useEffect(() => setTopic(thisChannel?.topic), [thisChannel?.topic])

  
  const handleEdit = async (e) => {
    e.preventDefault();
    const channelData = {...thisChannel, topic}
    console.log(`%c channelData:`, `color:yellow`, channelData)
    socket.emit('edit channel', channelData)
    return setToggleEdit(false);
  }

  const [showUserModal, setShowUserModal] = useState(false);

  const closeUserModal = async(e) => {
    e.preventDefault();
    setShowUserModal(false);
  }
  
  return (<div className='header'>
        <div className='chat-header row-list' onClick={() => setShowModal(true)} >
          <div>{thisChannel?.privateStatus ? 'π' : '#'} {thisChannel?.title}</div>
          <Icon iconName='expand'/>
        </div>

      {showModal && <Modal providedContent={true} onClose={closeChannelModal}>
        <div className='dropdown-nav' id='channel-info'>
            <div id='channel-info-top'>
              <h3>{thisChannel?.privateStatus ? 'π' : '#'} {thisChannel?.title}</h3>
              <br />
              
              <div className='channel-info row-list'>
                <div className={channelInfo === 'about' ? 'channel-info-selected' : ''} onClick={()=> setChannelInfo('about')}>About</div>
                <div className={channelInfo === 'members' ? 'channel-info-selected' : ''} onClick={()=> setChannelInfo('members')}>Members {users?.length}</div>
              </div>
            </div>

            {channelInfo === 'about' ? (
            <div id='channel-info-bottom'>
              <div className='channel-info-about'>
              <div style={{borderBottom:'solid 0.05em #ffffffa8'}}>
                {toggleEdit ? 
                  <form className='col-list' onSubmit={handleEdit}>
                    <textarea value={topic} onChange={e => setTopic(e.target.value)} style={{height:'100px'}} placeholder='Add a Topic'/>
                    <div className='row-list edit-message-buttons'>

                      <button className='cancel-message-button' type='button' onClick={()=>setToggleEdit(false)}>Cancel</button>
                      <button className='save-message-button' style={{cursor:'pointer'}} type="submit" >Save</button>

                    </div>
                  </form> : <div className='col-list' onClick={() => setToggleEdit(true)} >
                    <strong>Topic </strong>
                    {thisChannel?.topic ? thisChannel?.topic : 'Add a topic'}
                </div>
                }
              </div>

              <div onClick={closeChannelModal}>
                <strong>Created by</strong>
                {users[thisChannel?.host_id - 1].display_name} on {dayjs(thisChannel?.created_at).format('MMMM D, YYYY')}
              </div>
            </div>
            </div>
            )
            : 
            (<>
              <div className='channel-info-search'>
                <div>
                  <input placeholder='Find members' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
                </div>
              </div>

              <div className='channel-info-users col-list' >
                {users?.map(user => 
                  <>
                  <div onClick={()=>setShowUserModal(true)} key={user?.id} className='channel-list-item row-list' style={{alignItems:'center', cursor:'pointer'}} >
                    {user?.image_url === 'no image provided' ? <div className='nav-dropdown-image' >{user?.display_name[0].toUpperCase()}</div>
                      : <img className='nav-dropdown-image' src={user?.image_url} alt='user' style={{marginRight:'1em'}}/>}
                    <h3 className='nav-display-name'>{user?.display_name}</h3>
                  </div>
                  {showUserModal && <Modal providedId='show-user-modal' onClose={closeUserModal}>
                    {user?.image_url === 'no image provided' ? <div className='nav-dropdown-image' >{user?.display_name[0].toUpperCase()}</div>
                      : <img className='nav-dropdown-image' src={user?.image_url} alt='user' style={{marginRight:'1em'}}/>}
                    <h3 className='nav-display-name'>{user?.display_name}</h3>
                  </Modal>}
                  </>
                )}
              </div>
            </>)
            }
        </div>
      </Modal>}

        {sessionUser?.id === thisChannel?.host_id && <div className='flex-end'>
          <ChannelFormModal icon={true} edit={true} channel={thisChannel} />
          <Icon onClick={handleDelete} iconName='delete'/>
        </div>}
        
      </div>
  )
}

export default ChatHeader;