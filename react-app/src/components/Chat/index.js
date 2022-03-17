import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————
import ChannelFormModal from '../Channel/channel_modal';
import {DeleteChannelButton} from '../Utils/buttons';
import {getChannel} from '../../store/channel';
import {createMessage, getMessages2} from '../../store/message';
import './Chat.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
let socket;

const Chat = () => {
// **** ————————————————————————————————————————————————————————————————————————————STABLE
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelId } = useParams();

  const sessionUser = useSelector(state => state?.session?.user);
  const channelstate = useSelector(state => state?.channel);
  const messagestate =  useSelector(state => state?.message);
  
  const thisChannel = channelstate?.selected;
  const messagesArr = Object.values(messagestate?.messages);
  // console.log('Message Arr', messagesArr);
  
  useEffect(() => {
    const channel = dispatch(getChannel(channelId))
    // if (!channel) history.goBack();
  }, [dispatch, channelId]);
  useEffect(() => {dispatch(getMessages2(channelId))}, [dispatch, channelId]);
  // useEffect(() => {setTimeout(() => {alert('MessagesArr', messagesArr)}, 2000)}, [])
  // const [chatInput, setChatInput] = useState('');
  
// **** ——————————————————————————————————————————————————————————————————————————————————


  useEffect(() => {
    socket = io(); // open socket connection and create websocket
    // listen for chat events. when we recieve a chat, dispatch createMessage()
  
    socket.on("send", message => dispatch(createMessage(message)));

    return () => socket.disconnect(); // when component unmounts, disconnect
  }, [dispatch])

  const chatRef = useRef();
  
  const sendChat = async (e) => {
    e.preventDefault()  
    const chatInput = (chatRef.current.value)
    console.log('CHAT MESSAGE VALUE', chatInput)

    const mes = {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput};
    // console.log('Message obj send to backend', mes)
// !!!! ——————————————————————————————————————————————————————————————————————————————————
    const createdMessage = await dispatch(createMessage(mes));
    console.log('CREATED MESSAGE ——————————————————————————', createdMessage);
    // if(createdMessage.errors) alert(`ERRORS ${createdMessage.errors}`)
    if(createdMessage) alert(`HEY ${createdMessage}`);
// !!!! ——————————————————————————————————————————————————————————————————————————————————
    
    socket.emit('send', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput});
    // socket.emit('chat', { author: sessionUser?.username, content: chatInput });
    // setChatInput('');
    chatRef.current.value = '';
  }

  return (sessionUser && (
    <>
      <div className='header'>{thisChannel?.privateStatus ? 'π' : '#'} {thisChannel?.title}
      {/* <div className='header'>{selectedChannel?.privateStatus ? 'π' : '#'} {selectedChannel?.title} */}
        {sessionUser?.id === thisChannel?.host_id && <>
          <ChannelFormModal name='^' edit={true} channel={thisChannel} />
          <DeleteChannelButton channelId={thisChannel?.id}/>
        </>}
      </div>

      <div className='message-container'>
        {messagesArr?.map((message, ind) => (
          <div key={ind}>
            <MessageCard message={message} ind={ind}/>
            {/* {toggleEdit ? <FormComponent setToggleEdit={setToggleEdit}/> : <MessageCard setToggleEdit={setToggleEdit} message={message} ind={ind}/>} */}
          </div>
        ))}
      </div>

      <form onSubmit={sendChat} >
        {/* <label htmlFor='chat-input'>Send a message</label> */}
        <input id='chat-input' ref={chatRef} placeholder={`Message ${thisChannel?.privateStatus ? 'π' : '#'} ${thisChannel?.title}`} />
        {/* <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={`Message ${thisChannel?.privateStatus ? 'π' : '#'} ${thisChannel?.title}`} /> */}
        {/* <input value={chatInput} onChange={updateChatInput} placeholder={`Message ${selectedChannel?.privateStatus ? 'π' : '#'} ${selectedChannel?.title}`} /> */}
        {/* <button type="submit" disabled={!chatInput}>{'>'}</button> */}
        <button type="submit" >{'>'}</button>
      </form>
    </>
  )
  )
};


export default Chat;


const MessageCard = ({message, ind}) => {
  const [toggleEdit, setToggleEdit] = useState(false);

  return toggleEdit ? (
    <form >
      <input placeholder='Update message' />
      <button onClick={() => setToggleEdit(false)}>Toggle Edit</button>
    </form>
  ) : (
    <div className='message-card' key={ind}>
    {/* <img style={{height: '2em', width: '2em'}} src="https://img.pokemondb.net/sprites/black-white/normal/pidgey.png" alt="Pidgey"/> */}
    {/*  ——————————————————————————————————————————————————————————————————————————————  */}
    {/*  Here I'll probably want to see if I can alt={preloadedImage} or alt={custom css component that also uses the author's first initial}  */}
    {/*  ——————————————————————————————————————————————————————————————————————————————  */}
    <img style={{height: '2em', width: '2em'}} src={message?.author_image} alt="user"/>
    <div>{`${message?.author}: ${message?.content}`}</div>
    <button onClick={() => setToggleEdit(true)}>Toggle Edit</button>
    </div> 
  )
}