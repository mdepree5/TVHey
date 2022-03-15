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
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sessionUser = useSelector(state => state?.session?.user)

  const dispatch = useDispatch();
  const {channelId} = useParams()
  const channel = useSelector(state => state?.channel[ channelId ]);

  console.log('CHAT SELECTED CHANNEL', channel)
  useEffect(() => { dispatch(getChannel(channelId)) }, [dispatch, channelId])


  useEffect(() => {
    socket = io(); // open socket connection and create websocket
    socket.on('chat', (chat) => setMessages(messages => [...messages, chat]))
    return () => socket.disconnect(); // when component unmounts, disconnect
  }, [])

  const updateChatInput = (e) => setChatInput(e.target.value)

  const sendChat = async (e) => {
    e.preventDefault()
    socket.emit('chat', { user: sessionUser?.username, msg: chatInput });
    
    const mes = {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput};
    console.log('MESSAGE Obj to send to da back', mes)
    const mess = await dispatch(createMessage(mes));
    // if(mess.errors) alert(`ERRORS ${mess.errors}`)
    if(mess) alert(`HEY ${mess}`)
    // alert(`Message sent to the backend with content of: ${chatInput}`)
    setChatInput('')
  }

  const MessagesContainer = ({children}) => <div style={{overflow: 'auto'}} className='messages-container'>{children}</div>
  const MessageCard = ({children}) => <div className='message-card'>{children}</div>

  return (sessionUser && (
    <div className='messagess'>
      <div className='header'>{channel?.title}</div>

      <MessagesContainer>
        {messages.map((message, ind) => (
          <MessageCard key={ind}>
            <img style={{height: '2em', width: '2em'}} src="https://img.pokemondb.net/sprites/black-white/normal/pidgey.png" alt="Pidgey"/>
            <div>{`${message.user}: ${message.msg}`}</div>
          </MessageCard>
        ))}
      </MessagesContainer>

      <form onSubmit={sendChat} >
        <input value={chatInput} onChange={updateChatInput} />
        <button type="submit" disabled={!chatInput}>{'>'}</button>
      </form>
    </div>
  )
  )
};


export default Chat;