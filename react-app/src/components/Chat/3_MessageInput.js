import { useState } from "react";
import './Chat.css';
// ???? ——————————————————————————————————————————————————————————————————————————————————

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               3. Message Input
// todo ——————————————————————————————————————————————————————————————————————————————————
// const MessageInput = ({socket, sessionUser, dm=false, thisChannel, channelId, }) => {
const MessageInput = ({socket, sessionUser, dm=false, thisChannel, thisDM}) => {
  
  const [chatInput, setChatInput] = useState('');

  console.log(`%c thisDM?.id:`, `color:yellow`, thisDM?.id)

  const sendChat = async (e) => {
    e.preventDefault();
    // socket.emit('create message', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput})
    if (dm) {
      socket.emit('create dm message', {author_id: sessionUser?.id, dm_id: Number(thisDM?.id), content: chatInput})
    } else {
      socket.emit('create channel message', {author_id: sessionUser?.id, channel_id: Number(thisChannel?.id), content: chatInput})
    }
    setChatInput('');
  }

  return (
    <form id='message-writer' className='col-list' onSubmit={sendChat} >
      <input value={chatInput} onChange={e => setChatInput(e.target.value)}
        id='writer-input'
        placeholder={dm ? 
          `  Message ${thisDM?.host_id === sessionUser?.id ? thisDM?.recipient : thisDM?.host}`
        :
          `  Message ${thisChannel?.privateStatus ? 'π' : '#'} ${thisChannel?.title}`
        }
      />
      <button className={'submit-message-button'} id={chatInput && 'send-it'} type="submit" disabled={!chatInput}>
        <img style={{width:'1.2em', height:'1.2em'}} src='https://capstone-slack-clone.s3.amazonaws.com/icons-gray/send.png' alt='icon' />
      </button>
    </form>
  )
}

export default MessageInput;