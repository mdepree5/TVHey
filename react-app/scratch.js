
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Chat
// todo ——————————————————————————————————————————————————————————————————————————————————

import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
// import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {Icon} from '../Utils/icons';
import ChannelFormModal from '../Channel/channel_modal';
import {DeleteChannelButton} from '../Utils/buttons';
import {getChannel} from '../../store/channel';
import {createMessage, getMessages, updateMessage, deleteMessage} from '../../store/message-s';
// import {createMessage, updateMessage} from '../../store/message';
import './Chat.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Chat
// todo ——————————————————————————————————————————————————————————————————————————————————

const Chat = () => {
  const dispatch = useDispatch();
  const messagesRef = useRef();
  const { channelId } = useParams();
  const [chatInput, setChatInput] = useState('');

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channel);
  const messagestate =  useSelector(state => state?.messageS);
  const socket =  useSelector(state => state?.socket?.socket);

  const thisChannel = channelstate?.selected;
  const messagesArr = Object.values(messagestate?.messages);


  


  useEffect(() => dispatch(getChannel(channelId)), [dispatch, channelId]);

  // console.log(`%c chat component:`, `color:yellow`, socket)
  // console.log(`%c chat component:`, `color:yellow`, socket.connected)

  socket.on('message to front', message => dispatch(createMessage(JSON.parse(message))))
  socket.on('edited message to front', message => dispatch(updateMessage(JSON.parse(message))))
  socket.on('deleted message to front', id => dispatch(deleteMessage(id)))
  
  useEffect(() => {
    socket.emit('get messages', channelId)
    socket.on('get all messages', async(messages) => {
      const messageArr = [];
      messages.all_messages.forEach(message => messageArr.push(JSON.parse(message)))
      await dispatch(getMessages(messageArr))
    })
  }, [dispatch, channelId])

  const sendChat = async (e) => {
    e.preventDefault();
    socket.emit('create message', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput});
    setChatInput('');
  }

  
  return (sessionUser && (
    <>
      <div className='header'>
        <div>
          {thisChannel?.privateStatus ? 'π' : '#'} {thisChannel?.title}
        </div>
        {sessionUser?.id === thisChannel?.host_id && <div className='flex-end'>
          <ChannelFormModal icon={true} edit={true} channel={thisChannel} />
          <DeleteChannelButton channelId={thisChannel?.id}/>
        </div>}
      </div>

      <MessagesContainer messagesArr={messagesArr} sessionUser={sessionUser} ref={messagesRef} />

      <form id='message-writer' className='col-list' onSubmit={sendChat} >
        <input value={chatInput} onChange={e => setChatInput(e.target.value)}
          id='writer-input'
          placeholder={`  Message ${thisChannel?.privateStatus ? 'π' : '#'} ${thisChannel?.title}`}
        />
        <button className={'submit-message-button'} id={chatInput && 'send-it'} type="submit" disabled={!chatInput}>
          <img style={{width:'1.2em', height:'1.2em'}} src='https://capstone-slack-clone.s3.amazonaws.com/icons-gray/send.png' alt='icon' />
        </button>
      </form>
    </>)
  )
};
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Messages Container
// todo ——————————————————————————————————————————————————————————————————————————————————
const MessagesContainer = forwardRef(({messagesArr, sessionUser}, ref) => {
  const messageContainerRef = useRef();
  const scrollToBottom = () => messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;

  useLayoutEffect(()=>{scrollToBottom()});
  useImperativeHandle(ref, () => ({ scrollToBottom }))

  return (
    <div ref={messageContainerRef} role='log' className='message-container' >
      <br />
      {messagesArr?.map((message, ind) => (
        <MessageCard key={ind} message={message} sessionUser={sessionUser}/>
      ))}
      <br />
    </div>
  )
})
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Message Card
// todo ——————————————————————————————————————————————————————————————————————————————————
const MessageCard = ({message, sessionUser}) => {
  const dayjs = require('dayjs');
  const existing = message?.content;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [input, setInput] = useState(existing);

  const socket =  useSelector(state => state?.socket?.socket);

  const handleEdit = async(e) => {
    e.preventDefault();
    socket.emit('edit message', {...message, content:input});
    return setToggleEdit(false);
  }
  
  const handleCancel = e => {
    e.preventDefault();
    setInput(existing);
    return setToggleEdit(false);
  }

  const handleDelete = async () => socket.emit('delete message', message?.id);

  return toggleEdit ? (
  <form className='col-list message-card' onSubmit={handleEdit}>
    <input value={input} onChange={e => setInput(e.target.value)} style={{height:'100px'}} placeholder='Update message'/>
    <div className='row-list edit-message-buttons'>
      
      <button className='cancel-message-button' type='button' onClick={handleCancel}>Cancel</button>
      <button className='save-message-button' id={input ? 'send-it' : 'message-empty'} type="submit" disabled={!input}>
        {input ? 'Save' : 'Message cannot be empty'}
      </button>

    </div>
  </form>
  ) : (
    <div className='message-card'>
      <div className='message-card-header row-list'>
        <div className='message-header-left'>
          {message?.author_image === 'no image provided' ? 
            <div className='message-card-icon' >{message?.author[0].toUpperCase()}</div>
            :
            <img className='message-card-image' src={message?.author_image} alt="user"/>
          }
        </div>

        <div className='message-header-mid'>
          <div><strong>{message?.author} </strong>{
            dayjs(message?.created_at).format('h:mm A')
          }</div>
          {message?.content}
        </div>

        <div className='message-header-right'>
          {message?.author_id === sessionUser.id &&
            <div className='dropdown-content'>
              <Icon onClick={()=> setToggleEdit(true)} iconName='edit'/>
              <Icon onClick={handleDelete} iconName='delete'/>
            </div>
          }
        </div>
    </div>
  </div>
  )
}

export default Chat;





// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               store/socket.js
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const SET = 'socket/set';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const setSocket = socket => ({ type: SET, socket });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case SET: {
      const newState = {};
      newState.socket = action.socket;
      // console.log(`%c redux newState:`, `color:yellow`, newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default socketReducer;






// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               app
// todo ——————————————————————————————————————————————————————————————————————————————————


import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {UnAuthenticatedApp, AuthenticatedApp} from './components/2_Main';
import {authenticate} from './store/session';
// todo ——————————————————————————————————————————————————————————————————————————————————
const App = () => {
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);

  const sessionUser = useSelector(state => state?.session?.user);
  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setPageLoaded(true);
    })()
  }, [dispatch]);

  useEffect(() => {

    // const homeSocket = io.of('/');
    // homeSocket.on("connection", (socket) => {
    //   console.log(`%c ———————————————————————————————————————————————————`, `color:yellow`);
    //   console.log(`%c homesocket:`, `color:yellow`, socket)
    //   console.log(`%c ———————————————————————————————————————————————————`, `color:yellow`);
    // });


    const socket = io('/',
      // 'ws://localhost:3000/',
      {
        // {transports: ["websocket"]},
        transports: ["websocket", "polling"],
        // rememberUpgrade: true,
      },
    );

    console.log(`%c <App/> socket object:`, `color:orange`, socket)
    
    socket.on('connect', () => {
      console.log(`%c ———————————————————————————————————————————————————`, `color:lime`);
      console.log(`%c Connected`, `color:lime`);
      
      const engine = socket.io.engine;
      console.log(`%c engine object:`, `color:orange`, engine)
      console.log(`%c engine.transport.name:`, `color:yellow`, engine.transport.name)
      
      engine.once("upgrade", () => {
        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
        console.log(`%c engine.transport.name:`, `color:yellow`, engine.transport.name) // in most cases, prints "websocket"
      });
      console.log(`%c ———————————————————————————————————————————————————`, `color:lime`);
    })

    socket.on('disconnect', () => socket.connect());

    return (() => socket.disconnect())
  }, [dispatch, sessionUser])



  return pageLoaded && <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;