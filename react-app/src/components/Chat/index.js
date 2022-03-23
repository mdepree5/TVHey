import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import ChannelFormModal from '../Channel/channel_modal';
import {DeleteChannelButton, DeleteMessageButton} from '../Utils/buttons';
import {getChannel} from '../../store/channel';
import {createMessage, getMessages, updateMessage} from '../../store/message';
import './Chat.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
const Chat = () => {
  const messagesRef = useRef();
  const dispatch = useDispatch();
  const { channelId } = useParams();

  const [chatInput, setChatInput] = useState('');

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channel);
  const messagestate =  useSelector(state => state?.message);

  const thisChannel = channelstate?.selected;
  const messagesArr = Object.values(messagestate?.messages);

  useEffect(() => dispatch(getMessages(channelId)), [dispatch, channelId]);
  useEffect(() => dispatch(getChannel(channelId)), [dispatch, channelId]);

  const sendChat = async (e) => {
    e.preventDefault();
    await dispatch(createMessage({author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput}))
    setChatInput('');
  }
  
  return (sessionUser && (
    <>
      <div className='header'>
        <div>
          {thisChannel?.privateStatus ? 'π' : '#'} {thisChannel?.title}
        </div>
        {sessionUser?.id === thisChannel?.host_id && <div className='flex-end'>
          <ChannelFormModal name='^' edit={true} channel={thisChannel} />
          <DeleteChannelButton channelId={thisChannel?.id}/>
        </div>}
      </div>

      <MessagesContainer messagesArr={messagesArr} sessionUser={sessionUser} ref={messagesRef} />

      <form id='message-writer' className='col-list' onSubmit={sendChat} >
        <input value={chatInput} onChange={e => setChatInput(e.target.value)}
          id='writer-input'
          placeholder={`  Message ${thisChannel?.privateStatus ? 'π' : '#'} ${thisChannel?.title}`}
        />
        <button type="submit" disabled={!chatInput}>{'>'}</button>
      </form>

    </>
  )
  )
};

const MessagesContainer = forwardRef(({messagesArr, sessionUser}, ref) => {
  const messageContainerRef = useRef();
  const scrollToBottom = () => messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;

  useLayoutEffect(()=>{scrollToBottom()});
  useImperativeHandle(ref, () => ({ scrollToBottom }))

  return (
    <div ref={messageContainerRef} role='log' className='message-container' >
      {messagesArr?.map((message, ind) => (
        <MessageCard key={ind} message={message} sessionUser={sessionUser}/>
      ))}
    </div>
  )
})

export default Chat;


const MessageCard = ({message, sessionUser}) => {
  const dayjs = require('dayjs');
  const dispatch = useDispatch();
  const existing = message?.content;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [input, setInput] = useState(existing);
  const [showButtons, setShowButtons] = useState(false);

  const handleEdit = async(e) => {
    e.preventDefault();
    await dispatch(updateMessage({...message, content: input}, message?.id))
    return setToggleEdit(false);
  }
  
  const handleCancel = e => {
    e.preventDefault();
    setInput(existing);
    return setToggleEdit(false);
  }

  const toggleButtons = () => {
    setShowButtons(!showButtons)
  }

  return toggleEdit ? (
  <form className='col-list message-card' onSubmit={handleEdit}>
    <input value={input} onChange={e => setInput(e.target.value)} style={{height:'100px'}} placeholder='Update message'/>
    <div className='row-list edit-message-buttons'>
      <button type='button' onClick={handleCancel}>Cancel</button>
      <button type='submit'>Save</button>
    </div>
  </form>
  ) : (
    <div className='message-card'>
      <div className='message-card-header row-list'>
        <div className='message-header-left'>
          <img className='message-card-image' src={message?.author_image} alt="user"/>
        </div>

        <div className='message-header-mid'>
          <div><strong>{message?.author} </strong>{
            dayjs(message?.created_at).format('h:mm A')
          }</div>
          {message?.content}
        </div>

        <div className='message-header-right'>
          {message?.author_id === sessionUser.id &&
            <div className="dropdown-message">
              <button className='dropdown-button' onClick={toggleButtons}>...</button>
              <div className={`dropdown-content ${showButtons ? 'show-dropdown-content' : ''}`}>
                <button className='edit' onClick={() => setToggleEdit(true)}>^</button>
                <DeleteMessageButton messageId={message?.id}/>
              </div>
            </div>
          }
        </div>
    </div>
  </div>

  )
}
