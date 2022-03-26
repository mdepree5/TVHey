import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————

let socket;

const Chap = () => {
  // const {channelId} = useParams();
  const channelId = 1;

  const sessionUser = useSelector(state => state?.session?.user);

  // const dayjs = require('dayjs');
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // open socket connection
    // create websocket

    socket = io(); 

    // console.log(`%c socket:`, `color:yellow`, socket)
    // socket.on('response', response => console.log(`%c response:`, `color:yellow`, response))
    // socket.on('all_channels', channels => console.log(`%c channels:`, `color:yellow`, channels))
    // socket.on('all_users', users => console.log(`%c users:`, `color:yellow`, users))

    // socket.on('all_channels', all_channels => all_channels.all_channels.forEach(channel => {
    //   const parsed = JSON.parse(channel)
    //   console.log('channel date', dayjs(parsed?.created_at).format('h:mm A'))
    //   console.log('channel title', parsed?.title)
    // }));



    socket.on("chat", (chat) => {
      console.log(`%c chat:`, `color:yellow`, chat)
      setMessages(messages => [...messages, chat])
    })
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
    }, [])

  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()
    // socket.emit("chat", { user: user.username, msg: chatInput });
    socket.emit('chat', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput});
    console.log(`%c chatInput:`, `color:skyblue`, chatInput)
    setChatInput('')
  }

  return (
    <div>
      <div> 
        {messages.map((message, ind) => (
          <div key={ind}>{`${message.author_id}: ${message.content}`}</div>
        ))} 
      </div>

      <form onSubmit={sendChat}>
        <input value={chatInput} onChange={updateChatInput} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
};


export default Chap;