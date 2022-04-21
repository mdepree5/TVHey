import { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
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
                  Component with User's Display Name
                  
                  PERHAPS: Rather than use a modal...
                  1. Create a custom div/component that has a [toggleClick, setToggleClick] = useState(false)
                  2. {'toggleClick' && <div>
                      Show the pseudo chat component form
                    </div>}
                  3. This way the thing is 'in-line' with each search-barred "user" component in the search dropdown

                  1. OnClick - Open a modal to send a message
                  2. Chat component message input form
                    i. borrow all styling
                    ii. modify handleSubmit to accommodate for below logic

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
                <UserSearchComponent key={user.id} user={user} />
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


const UserSearchComponent = ({user}) => {
  const history = useHistory();
  const [toggleForm, setToggleForm] = useState(false)
  const [input, setInput] = useState('');

  const socket =  useSelector(state => state?.socket?.socket);
  const sessionUser = useSelector(state => state?.session?.user);

  const sendMessage = async(e) => {
    e.preventDefault();

    let newDMId;
    
    const dmData = {host_id: sessionUser?.id, recipient_id: user?.id}
    socket.emit('create dm', dmData)
    /* 
      * this line should run from main.js: socket.on('dm to front', dm => dispatch(createDM(JSON.parse(dm))))
      * then, state should update..
      * 
    */
    socket.on('dm to front', dm => newDMId = JSON.parse(dm).id)

    socket.emit('create dm message', {author_id: sessionUser?.id, dm_id: newDMId, content: input})

    history.push(`/dms/${newDMId}`)
  }

  const handleCancel = e => {
    e.preventDefault();
    setInput('');
    return setToggleForm(false);
  }

  return (
    <div className='channel-list-item' onClick={setToggleForm(true)} >
      {user?.display_name}
      
      {toggleForm && 
        <form className='col-list message-card' onSubmit={sendMessage}>
          <input value={input} onChange={e => setInput(e.target.value)} style={{height:'100px'}}
            placeholder={`  Message ${user?.display_name}`}/>
          
          <div className='row-list edit-message-buttons'>

            <button className='cancel-message-button' type='button' onClick={handleCancel}>Cancel</button>
            {/* <button className='save-message-button' id={input ? 'send-it' : 'message-empty'} type="submit" disabled={!input}> */}
            <button className='submit-message-button' id={input ? 'send-it' : 'message-empty'} type="submit" disabled={!input}>
              {input ? 'Save' : 'Message cannot be empty'}
            </button>

          </div>
        </form>
      }
    </div>
  )
}


export default Search;
