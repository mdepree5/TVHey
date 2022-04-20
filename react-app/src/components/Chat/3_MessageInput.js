import { useState } from "react";
import './Chat.css';
// ???? ——————————————————————————————————————————————————————————————————————————————————

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               3. Message Input
// todo ——————————————————————————————————————————————————————————————————————————————————
const MessageInput = ({socket, thisChannel, channelId, sessionUser}) => {
  
  const [chatInput, setChatInput] = useState('');

  const sendChat = async (e) => {
    e.preventDefault();
    socket.emit('create message', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput})
    setChatInput('');
  }

  return (
    <form id='message-writer' className='col-list' onSubmit={sendChat} >
      <input value={chatInput} onChange={e => setChatInput(e.target.value)}
        id='writer-input'
        placeholder={`  Message ${thisChannel?.privateStatus ? 'π' : '#'} ${thisChannel?.title}`}
      />
      <button className={'submit-message-button'} id={chatInput && 'send-it'} type="submit" disabled={!chatInput}>
        <img style={{width:'1.2em', height:'1.2em'}} src='https://capstone-slack-clone.s3.amazonaws.com/icons-gray/send.png' alt='icon' />
      </button>
    </form>
  )
}

export default MessageInput;