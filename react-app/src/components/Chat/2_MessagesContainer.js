import { useRef, forwardRef, useImperativeHandle, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
// ???? ——————————————————————————————————————————————————————————————————————————————————
import {Icon} from '../Utils/icons';
import './Chat.css';
// ??? ——————————————————————————————————————————————————————————————————————————————————

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               2. Messages Container
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
// todo                               2. Message Card
// todo ——————————————————————————————————————————————————————————————————————————————————
const MessageCard = ({message, sessionUser}) => {
  const dayjs = require('dayjs');
  const existing = message?.content;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [input, setInput] = useState(existing);

  const socket =  useSelector(state => state?.socket?.socket);

  const handleEdit = async(e) => {
    e.preventDefault();
    socket.emit('edit message', {...message, content:input})
    return setToggleEdit(false);
  }
  
  const handleCancel = e => {
    e.preventDefault();
    setInput(existing);
    return setToggleEdit(false);
  }
  
  const handleDelete = async () => {
    socket.emit('delete message', message?.id)
  };

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

export default MessagesContainer;