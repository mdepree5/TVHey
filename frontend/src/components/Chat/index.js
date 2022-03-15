import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

import './Chat.css';
let socket;

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  // const user = useSelector(state => state.session.user)

  const user = 'hi';

  useEffect(() => {
    socket = io(); // open socket connection and create websocket
    socket.on('chat', (chat) => setMessages(messages => [...messages, chat]))
    return () => socket.disconnect(); // when component unmounts, disconnect
  }, [])

  const updateChatInput = (e) => setChatInput(e.target.value)

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit('chat', { user: user.username, msg: chatInput });
    // alert(`Message sent to the backend with content of: ${chatInput}`)
    setChatInput('')
  }

  const MessagesContainer = ({children}) => <div style={{overflow: 'auto'}} className='messages-container'>{children}</div>
  const MessageCard = ({children}) => <div className='message-card'>{children}</div>
  const Line = ({width, margin=null}) => (
    <>  
      <br />
      <div style={{width:`${width}`, margin:`${margin}`}} className="line" />
      <br />
    </>

  )

  return (user && (
    <div className='messagess'>
      <br />
      <MessagesContainer>
        {messages.map((message, ind) => (
          <MessageCard key={ind}>
            <img style={{height: '2em', width: '2em'}} src="https://img.pokemondb.net/sprites/black-white/normal/pidgey.png" alt="Pidgey"/>
            <div>{`${message.user}: ${message.msg}`}</div>
          </MessageCard>
        ))}
      </MessagesContainer>
      <br />
      <form onSubmit={sendChat}>
        <input value={chatInput} onChange={updateChatInput} />
        <button type="submit">{'>'}</button>
      </form>
    </div>
  )
  )
};


export default Chat;