import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import { Modal } from '../../context/Modal';

import './Navigation.css'
// ???? ——————————————————————————————————————————————————————————————————————————————————

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [showModal, setShowModal] = useState(false);

  const userstate = useSelector(state => state?.session)
  const channelstate = useSelector(state => state?.channelSocket)
  const dmstate = useSelector(state => state?.dmSocket);
  
  const users = Object.values(userstate?.allUsers).filter(user => user.display_name.toLowerCase().includes(searchInput));
  const channels = Object.values(channelstate?.channels).filter(channel => channel.title.toLowerCase().includes(searchInput));

  const selectedUsersDMs = dmstate?.selectedUsersDMs

  console.log(`%c ——————————————————————————————————————————:`, `color:green`)
  console.log(`%c selectedUsersDMs:`, `color:yellow`, selectedUsersDMs)
  console.log(`%c ——————————————————————————————————————————:`, `color:green`)


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
        <div className='dropdown-nav' id='search'>
          <div className='col-list' >
            {searchInput && users?.map(user => 
              <>
                {/* 
                  A NEW Modal, where you send a message. And part of the submission handling is that it 
                    1. Reference the user's id and compare it with a host or recipient ID 
                      a. OR: Create a slice of state that maps out all of the users that share a DM:
                        It has Key:Val pairs that represent the user's id and the DM Id
                          const kv state: {
                            1: 5
                            2: 7
                            where "1" represents "user 1" and "5" represents 
                          }
                          The reason this is ideal is because a user can have MANY DMs
                          This implementation is a space-for-time complexity tradeoff.
                          We are creating a new object in state, which occupies space. 
                          But the time tradeoff is we avoid having to iterate over and filter through ALL users each time we search/query.
                          Instead, we can simply reference the slice of state that carries the relevant information we want: 
                            i. the user Id and if the session user has dms with themselves
                            ii. access to the dm Id itself, so we can route there if we need to (or create a new DM instance)
                    2. If dm does not exist in state, create new dm
                    3. If 

                 */}
                <div>
                  Component with User's Display Name that opens a modal to send a message
                  {selectedUsersDMs[user?.id] === undefined ? 
                    <div>
                      Open modal
                      1. dispatch create new DM
                      2. dispatch create new Message
                      3. Route to newly created DM/newlyCreatedDM.id
                      Return close modal
                    </div>
                  :
                    <div>
                      Open modal
                      1. dispatch create new Message
                      2. Route to existing DM/selectedUsersDMs[user?.id]
                      Return close modal
                    </div>
                  }
                </div>
                <NavLink to={`/dms/${user?.id}`} key={user?.id} className='channel-list-item' activeStyle={{backgroundColor:'#EC8642', color: 'white', display: 'unset'}} >{user?.privateStatus ? 'π' : '#'} {user?.display_name} {'X'}</NavLink>
              </>
            )}
            {searchInput && channels?.map(channel => (
              <NavLink to={`/channels/${channel?.id}`} onClick={clickChannel} key={channel?.id} className='channel-list-item' activeStyle={{backgroundColor:'#EC8642', color: 'white', display: 'unset'}} >{channel?.privateStatus ? 'π' : '#'} {channel?.title}</NavLink>
            ))}
          </div>        
        </div>
      </Modal>}
    </div>
  )
}


export default Search;
