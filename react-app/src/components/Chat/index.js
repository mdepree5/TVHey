import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {Icon} from '../Utils/icons';
import ChannelFormModal from '../Channel/channel_modal';
import {DeleteChannelButton, DeleteMessageButton} from '../Utils/buttons';
import {getChannel} from '../../store/channel';
// import {createMessage, getMessages, updateMessage} from '../../store/message';
import {createMessage, updateMessage} from '../../store/message';
import './Chat.css';
// todo ——————————————————————————————————————————————————————————————————————————————————

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Chat
// todo ——————————————————————————————————————————————————————————————————————————————————


const Chat = ({socket}) => {
  const messagesRef = useRef();
  const dispatch = useDispatch();
  const { channelId } = useParams();

  const [mezState, setMezState] = useState([]);

  const [chatInput, setChatInput] = useState('');

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channel);
  // const messagestate =  useSelector(state => state?.message);

  const thisChannel = channelstate?.selected;
  // const messagesArr = Object.values(messagestate?.messages);

  // useEffect(() => dispatch(getMessages(channelId)), [dispatch, channelId]);
  useEffect(() => dispatch(getChannel(channelId)), [dispatch, channelId]);


  useEffect(() => {  
    // socket = io({ auth: {token: 'abc'} });
    console.log(`%c ————————————————————————————————————————————————`, `color:yellow`)
    console.log(`%c socket in chat component:`, `color:yellow`, socket)
    console.log(`%c ————————————————————————————————————————————————`, `color:yellow`)
    
    socket.on('get all channels', response => console.log(`%c get all channels:`, `color:yellow`, response))
// todo ——————————————————————————————————————————————————————————————————————————————————

    socket.on('message to front', chat => {
      console.log(`%c chat to front:`, `color:yellow`, JSON.parse(chat))
      setMezState(messages => [...messages, JSON.parse(chat)])
    })
    
    socket.on('edited message to front', chat => {
      console.log(`%c chat to front:`, `color:yellow`, JSON.parse(chat))
      setMezState(messages => [...messages, JSON.parse(chat)])
    })

    socket.emit('get messages', channelId)

    socket.on('all_messages', all_messages => {
      console.log(`%c all_messages:`, `color:yellow`, all_messages)
      const messages = [];
      all_messages.all_messages.forEach(message => {
        const parsed = JSON.parse(message)
        messages.push(parsed)
      })
      setMezState([...messages]);
    })

    // return (() => socket.disconnect())
  }, [channelId])


  const sendChat = async (e) => {
    e.preventDefault();
    socket.emit('create message', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput});
    socket.emit('get messages', channelId)
    // await dispatch(createMessage({author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput}))
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

      <MessagesContainer socket={socket} messagesArr={mezState} sessionUser={sessionUser} ref={messagesRef} />

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
const MessagesContainer = forwardRef(({socket, messagesArr, sessionUser}, ref) => {
  const messageContainerRef = useRef();
  const scrollToBottom = () => messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;

  useLayoutEffect(()=>{scrollToBottom()});
  useImperativeHandle(ref, () => ({ scrollToBottom }))

  return (
    <div ref={messageContainerRef} role='log' className='message-container' >
      <br />
      {messagesArr?.map((message, ind) => (
        <MessageCard key={ind} message={message} sessionUser={sessionUser} socket={socket}/>
      ))}
      <br />
    </div>
  )
})
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Message Card
// todo ——————————————————————————————————————————————————————————————————————————————————
const MessageCard = ({message, sessionUser, socket}) => {
  const { channelId } = useParams();
  const dayjs = require('dayjs');
  // const dispatch = useDispatch();
  const existing = message?.content;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [input, setInput] = useState(existing);

  const handleEdit = async(e) => {
    e.preventDefault();
    // await dispatch(updateMessage({...message, content: input}, message?.id))
    socket.emit('edit message', {...message, content:input});
    socket.emit('get messages', channelId)
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
              <DeleteMessageButton messageId={message?.id}/>
              <DeleteMessage socket={socket} messageId={message?.id} channelId={channelId} />
            </div>
          }
        </div>
    </div>
  </div>
  )
}

export default Chat;

export const DeleteMessage = ({ socket, messageId, channelId }) => {

  const handleDelete = async () => {
    socket.emit('delete message', messageId);
    socket.emit('get messages', channelId)
  }

  // return <Icon onClick={handleDelete} iconName='delete'/>
  return <button onClick={handleDelete}>X</button>
}