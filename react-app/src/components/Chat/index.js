import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import ChatHeader from './1_ChatHeader';
import MessagesContainer from './2_MessagesContainer.js';
import MessageInput from './3_MessageInput.js';

import {setChannel} from '../../store/channelSocket';
import {createMessage, getMessages, updateMessage, deleteMessage} from '../../store/messageSocket';
// import './Chat.css';
// ???? ——————————————————————————————————————————————————————————————————————————————————

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Chat
// todo ——————————————————————————————————————————————————————————————————————————————————
const Chat = ({ dm=false }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const messagesRef = useRef();
  const { channelId } = useParams();
  
  console.log(`%c dm:`, `color:yellow`, dm)

  /* 
  Chat component will either be: 1. channel or 2. dmstate

  how can I abstract channel and dm in a way where I can make the chat component dynamically
  
  what direct children of Chat component actually need to know channel/dm distinction? ==> 
    1. ChatHeader, for the modal 
  
  */

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channelSocket);

  // todo ——————————————————————————————————————————————————————————————————————————————————
  const dmstate = useSelector(state => state?.dmSocket);
  const thisdm = dmstate?.selected;

  console.log(`%c thisdm:`, `color:yellow`, thisdm)

  // todo ——————————————————————————————————————————————————————————————————————————————————

  const messagestate =  useSelector(state => state?.messageSocket);
  const socket =  useSelector(state => state?.socket?.socket);
  
  const thisChannel = channelstate?.selected;
  const messagesArr = Object.values(messagestate?.messages);

  setTimeout(() => {if (channelstate?.channels[channelId] === undefined) history.push('/')}, 100);
  
  useEffect(() => {
    if(socket){
      socket.emit('set channel', channelId)
      socket.emit('get messages', channelId)
      socket.on('get all messages', async(messages) => await dispatch(getMessages(messages?.all_messages)))
      // socket.on('get all messages', async(messages) => {
      //   const messageArr = [];
      //   messages.all_messages.forEach(message => messageArr.push(JSON.parse(message)))
      //   await dispatch(getMessages(messageArr))
      // })

      socket.on('set channel to front', channel => dispatch(setChannel(JSON.parse(channel))))
      socket.on('message to front', message => dispatch(createMessage(JSON.parse(message))))
      socket.on('edited message to front', message => dispatch(updateMessage(JSON.parse(message))))
      socket.on('deleted message to front', id => dispatch(deleteMessage(id)))
    }
  }, [channelId, socket])

  return (sessionUser && (
    <>
      <ChatHeader socket={socket} thisChannel={thisChannel} channelId={channelId} sessionUser={sessionUser} />

      <MessagesContainer messagesArr={messagesArr} sessionUser={sessionUser} ref={messagesRef} />

      <MessageInput socket={socket} thisChannel={thisChannel} channelId={channelId} sessionUser={sessionUser} />
    </>)
  )
};
export default Chat;