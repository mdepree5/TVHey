import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { io } from 'socket.io-client';
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
let socket;

const Chat = () => {
  const messagesRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelId } = useParams();
  const [chatInput, setChatInput] = useState('');

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channel);
  const messagestate =  useSelector(state => state?.messageS);

  // const socket = useSelector(state => state?.socket);

  const thisChannel = channelstate?.selected;
  const messagesArr = Object.values(messagestate?.messages);

  // useEffect(() => dispatch(getMessages(channelId)), [dispatch, channelId]);
  useEffect(() => dispatch(getChannel(channelId)), [dispatch, channelId]);


  useEffect(() => {
    // socket = io({ auth: {token: 'abc'} });
    socket = io();
    console.log(`%c ————————————————————————————————————————————————`, `color:yellow`); console.log(`%c socket!!:`, `color:yellow`, socket); console.log(`%c ————————————————————————————————————————————————`, `color:yellow`)
    // socket.on('get all channels', response => console.log(`%c get all channels:`, `color:yellow`, response))
    socket.on('message to front', async(message) => await dispatch(createMessage(JSON.parse(message))))
    socket.on('edited message to front', async(message) => await dispatch(updateMessage(JSON.parse(message))))
    socket.on('deleted message to front', async(id) => await dispatch(deleteMessage(id)))
    
    socket.emit('get messages', channelId)
    socket.on('get all messages', async(messages) => {
      const messageArr = [];
      messages.all_messages.forEach(message => messageArr.push(JSON.parse(message)))
      await dispatch(getMessages(messageArr))
    })

    return (() => socket.disconnect())
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
  const { channelId } = useParams();
  const dayjs = require('dayjs');
  const existing = message?.content;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [input, setInput] = useState(existing);

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
              <DeleteMessage messageId={message?.id} channelId={channelId} />
            </div>
          }
        </div>
    </div>
  </div>
  )
}

export default Chat;

export const DeleteMessage = ({ messageId }) => {
  const handleDelete = async () => socket.emit('delete message', messageId);
  return <Icon onClick={handleDelete} iconName='delete'/>
}