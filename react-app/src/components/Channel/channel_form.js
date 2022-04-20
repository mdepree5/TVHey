import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
// import { createChannel, updateChannel } from '../../store/channel';
import {FormInput, FormButton, FormErrors} from '../Utils/forms';
import './Channel.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
const ChannelForm = ({ edit, channel, closeModal }) => {
  const history = useHistory();
  const socket =  useSelector(state => state?.socket?.socket);
  
  const host_id = useSelector(state => state?.session?.user?.id);
  const [title, setTitle] = useState(edit ? channel?.title : '');
  const [topic, setTopic] = useState(edit ? channel?.topic : '');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const channelData = {...channel, host_id, title, topic}

    if (edit) {
      socket.emit('edit channel', channelData)
      return closeModal();
    }
    
    socket.emit('create channel', channelData)
    socket.on('channel to front', channel => {
      history.push(`/channels/${JSON.parse(channel)?.id}`);
      return closeModal();
    })
    return 'Failed to Create';
    }



  return (
    <form className='channel-form-container' onSubmit={handleSubmit}>
      <FormInput name='Title' show={true} validation={title.length} message='Provide a title' state={title} setState={setTitle} />
      <FormInput textarea={true} name='Topic' show={true} message='Set a topic (optional)' required={false} state={topic} setState={setTopic} />
      
      {<small style={{fontSize:'0.8em', color:'#EC8642'}}>* = required</small>}
      
      <FormButton validation={title.length} disabledLogic={!title.length} buttonNameLogic={edit ? 'Update' : 'Create'} />
      
      <FormErrors errors={errors} />
    </form>
  )
}

export default ChannelForm;


// !!!! ——————————————————————————————————————————————————————————————————————————————————
// !!!!                               Deprecated
// !!!! ——————————————————————————————————————————————————————————————————————————————————
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const channelData = {...channel, host_id, title, topic}

  //   if (edit) {
  //     const updated = await dispatch(updateChannel(channelData, channel?.id));
  //     if (updated?.errors) setErrors(updated?.errors);
  //     return closeModal();
  //   }

  //   const created = await dispatch(createChannel(channelData));

  //   if (created?.errors) setErrors(created?.errors);
  //   if (created?.id) {
  //     history.push(`/channels/${created?.id}`);
  //     return closeModal();
  //   }
  //   return 'Failed to Create';
  // };