import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// import { useParams, Redirect, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————

import ChannelFormModal from '../Channel/channel_modal';
import {DeleteChannelButton} from '../Utils/buttons';
import {getChannel} from '../../store/channel';
import {createMessage, getMessages} from '../../store/message';
import './Chat.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
let socket;

const Chat = () => {
// **** ————————————————————————————————————————————————————————————————————————————STABLE
  const dispatch = useDispatch();
  // const history = useHistory();
  const { channelId } = useParams();

  const [chatInput, setChatInput] = useState('');

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channel);
  const messagestate =  useSelector(state => state?.message);
  
  const thisChannel = channelstate?.selected;
  const messagesArr = Object.values(messagestate?.messages);
  // console.log('Message Arr', messagesArr);
  
  useEffect(() => {
    dispatch(getChannel(channelId))
    // const channel = dispatch(getChannel(channelId)))
    // if (!channel) history.goBack();
  }, [dispatch, channelId]);
  useEffect(() => {dispatch(getMessages(channelId))}, [dispatch, channelId]);
// **** ——————————————————————————————————————————————————————————————————————————————————
  
// const socket = io.connect(base)
// const base = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:3000/api';
// socket = io.connect(base)

useEffect(() => {
    socket = io(); // open socket connection and create websocket
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo ——————————————————————————————————————————————————————————————————————————————————
if (process.env.NODE_ENV === 'production') socket = io('https://tvhey.herokuapp.com/')
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo ——————————————————————————————————————————————————————————————————————————————————
    // listen for chat events. when we recieve a chat, dispatch createMessage()
    socket.on('chat', message => {
      console.log('HEY———————————————————')
      console.log(message)
      console.log('HEY———————————————————')
      dispatch(createMessage(message));
    });
    
    return () => socket.disconnect(); // when component unmounts, disconnect
    // }, [])
  }, [dispatch])
  
  const sendChat = async (e) => {
    e.preventDefault()  

    const mes = {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput};
    // !!!! ——————————————————————————————————————————————————————————————————————————————
    // const createdMessage = await dispatch(createMessage(mes));
    // console.log(createdMessage);
    // !!!! ——————————————————————————————————————————————————————————————————————————————
    socket.emit('chat', mes);
    setChatInput('')
  }
  // console.log(chatRef.current.value)

  return (sessionUser && (
    <>
      <div className='header'>{thisChannel?.privateStatus ? 'π' : '#'} {thisChannel?.title}
      {/* <div className='header'>{selectedChannel?.privateStatus ? 'π' : '#'} {selectedChannel?.title} */}
        {sessionUser?.id === thisChannel?.host_id && <>
          <ChannelFormModal name='^' edit={true} channel={thisChannel} />
          <DeleteChannelButton channelId={thisChannel?.id}/>
        </>}
      </div>

      <div className='message-container'>
        {messagesArr?.map((message, ind) => (
          <MessageCard key={ind} message={message} sessionUser={sessionUser}/>
        ))}
      </div>

      <form onSubmit={sendChat} >
        <input value={chatInput} onChange={e => setChatInput(e.target.value)}
          placeholder={`Message ${thisChannel?.privateStatus ? 'π' : '#'} ${thisChannel?.title}`}
        />
        <button type="submit" disabled={!chatInput}>{'>'}</button>
      </form>
    </>
  )
  )
};


export default Chat;


const MessageCard = ({message, sessionUser}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [input, setInput] = useState(message?.content);
  
  useEffect(()=> {
    if (!showDropdown) return;
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener('click', closeDropdown)
    document.removeEventListener('click', closeDropdown)
  }, [showDropdown]);

  const handleEdit = () => {
    console.log('handle Edit')
    setToggleEdit(false)
  }

  return toggleEdit ? (
  <form className='col-list message-card' onSubmit={handleEdit}>
    <input value={input} onChange={e => setInput(e.target.value)} style={{height:'100px'}} placeholder='Update message'/>
    <div className='row-list edit-message-buttons'>
      <button type='button' onClick={() => setToggleEdit(false)}>Cancel</button>
      <button type='submit'>Save</button>
    </div>
  </form>
  ) : (
    <div className='row-list message-card'>
      <div id='left-mes'>
        <img style={{height: '2em', width: '2em'}} src={message?.author_image} alt="user"/>
      </div>

      <div id='mid-mes'>
        <div>{message?.author}</div>
        <div>{message?.content}</div>
      </div>

      <div id='right-mes' className='row-list'>
        {showDropdown && (
          <div id='message-dropdown' className='dropdown row-list'>
            <button onClick={() => setToggleEdit(true)}>Toggle Edit</button>
            <button onClick={() => console.log('delete')}>Delete</button>
          </div>
        )}
        <div id='message-menu' onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}>...</div>
      </div>

    </div> 
  )
}
// {message?.author_id === sessionUser.id && <>put stuff here</>}