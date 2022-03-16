import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————

import {getChannel} from '../../store/channel';
import {createMessage} from '../../store/message';
import './Chat.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
let socket;

const Chat = () => {
  const dispatch = useDispatch();
  const {channelId} = useParams();
  console.log('CHANNELID', channelId);
  
  const sessionUser = useSelector(state => state?.session?.user);
  const channel = useSelector(state => state?.channel?.channels[channelId]);
  const messagesObj =  useSelector(state => state?.channel?.messages);
  
  useEffect(() => { dispatch(getChannel(channelId)) }, [dispatch, channelId]);

  const messageArr = Object.values(messagesObj);
  console.log('CHAT COMPONENT MESSAGES', messageArr)

  const [chatInput, setChatInput] = useState('');
  // const [messages, setMessages] = useState(messageArr);
  const [messages, setMessages] = useState([...messageArr]);
  console.log('STATE : MESSAGES', messages)

  useEffect(() => {
    socket = io(); // open socket connection and create websocket
    socket.on('chat', (chat) => setMessages(messages => [...messages, chat]))
    return () => socket.disconnect(); // when component unmounts, disconnect
  }, [])

  const updateChatInput = (e) => setChatInput(e.target.value)

  const sendChat = async (e) => {
    e.preventDefault()
    
    const mes = {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput};
    console.log('MESSAGE Obj to send to da back', mes)
    const mess = await dispatch(createMessage(mes));
    console.log('MESS AWAIT!?!?!?!', mess)
    // if(mess.errors) alert(`ERRORS ${mess.errors}`)
    if(mess) alert(`HEY ${mess}`);
    // alert(`Message sent to the backend with content of: ${chatInput}`)
    
    socket.emit('chat', { author: sessionUser?.username, content: chatInput });

    setChatInput('');
  }

  

  return (sessionUser && (
    <div className='chat'>
      <div className='header'>{channel?.privateStatus ? 'π' : '#'} {channel?.title}</div>

      <div className='messagez'>
        {messages.map((message, ind) => (
          <div className='message-card' key={ind}>
            <img style={{height: '2em', width: '2em'}} src="https://img.pokemondb.net/sprites/black-white/normal/pidgey.png" alt="Pidgey"/>
            <div>{`${message?.author}: ${message?.content}`}</div>
          </div>
        ))}
      </div>
      <form onSubmit={sendChat} >
        <input value={chatInput} onChange={updateChatInput} placeholder={`Message ${channel?.privateStatus ? 'π' : '#'} ${channel?.title}`} />
        <button type="submit" disabled={!chatInput}>{'>'}</button>
      </form>
    </div>
  )
  )
};


export default Chat;