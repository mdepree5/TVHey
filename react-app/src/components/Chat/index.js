import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import ChatHeader from './1_ChatHeader';
import MessagesContainer from './2_MessagesContainer';
import MessageInput from './3_MessageInput';

import {setChannel} from '../../store/channelSocket';
import {setDM} from '../../store/dmSocket';
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
  const { dmId } = useParams();

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channelSocket);
  const dmstate = useSelector(state => state?.dmSocket);
  const messagestate =  useSelector(state => state?.messageSocket);
  const socket =  useSelector(state => state?.socket?.socket);
  
  const thisDM = dmstate?.selected;
  const thisChannel = channelstate?.selected;
  const messagesArr = Object.values(messagestate?.messages);
  
  console.log(`%c thisDM:`, `color:yellow`, thisDM)

  setTimeout(() => {
    if (dm) { if (dmstate?.dms[dmId] === undefined) history.push('/')}
    else { if (channelstate?.channels[channelId] === undefined) history.push('/') }
  }, 100);
  
  useEffect(() => {
    if(socket){
      if (dm) {
        socket.emit('set dm', dmId)
        socket.emit('get dm messages', dmId)
      } else {
        socket.emit('set channel', channelId)
        socket.emit('get channel messages', channelId)
      }
      socket.on('get all messages', async(messages) => await dispatch(getMessages(messages?.all_messages)))
      
      socket.on('set dm to front', dm => dispatch(setDM(JSON.parse(dm))))
      socket.on('set channel to front', channel => dispatch(setChannel(JSON.parse(channel))))
      
      socket.on('message to front', message => dispatch(createMessage(JSON.parse(message))))
      socket.on('edited message to front', message => dispatch(updateMessage(JSON.parse(message))))
      socket.on('deleted message to front', id => dispatch(deleteMessage(id)))
    }
  }, [channelId, dmId, socket])

  return (sessionUser && (
    <>
      <ChatHeader
        socket={socket}
        sessionUser={sessionUser}
        dm={dm}
        thisChannel={thisChannel}
        channelId={channelId}
        thisDM={thisDM}
      />

      <MessagesContainer messagesArr={messagesArr} sessionUser={sessionUser} ref={messagesRef} />

      <MessageInput
        socket={socket}
        sessionUser={sessionUser}
        dm={dm}
        thisChannel={thisChannel}
        thisDM={thisDM}
      />
    </>)
  )
};
export default Chat;

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Pseudo
// todo ——————————————————————————————————————————————————————————————————————————————————
/* 
if a DM exists where user exists, direct to that. if not, then create a new one.

frontend filter, similar to the display name logic.. contingent on the host/recipient logic. 

create will pass in a host id and recipient id.

the ability to click on a user and go to a DM of theirs will be from Search primarily.

Chat component will either be: 1. channel or 2. dmstate

how can I abstract channel and dm in a way where I can make the chat component dynamically

what direct children of Chat component actually need to know channel/dm distinction? ==> 
1. ChatHeader, for the modal 

*/