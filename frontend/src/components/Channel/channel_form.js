import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { createChannel, updateChannel } from '../../store/channel';
import {FormInput, FormErrors} from '../Utils/forms';
import './Channel.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
const ChannelForm = ({ name, edit, channel, closeModal }) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // console.log('EDIT', edit);
  // console.log('CHANNEL', channel)

  const host_id = useSelector(state => state?.session?.user?.id);
  const [title, setTitle] = useState(edit ? channel?.title : '');
  const [topic, setTopic] = useState(edit ? channel?.topic : '');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const channelData = {...channel, host_id, title, topic}

    if (edit) {
      const updated = await dispatch(updateChannel(channelData, channel?.id));
// !!!! ——————————————————————————————————————————————————————————————————————————————————
      console.log('UPDATED ———————————————————————', updated)
// !!!! ——————————————————————————————————————————————————————————————————————————————————
      if (updated?.errors) setErrors(updated?.errors);
      return closeModal();
      // if (updated?.id) {
      //   history.push(`/`) // => data loads but visual render not immediate
      //   history.push(`/channels/${channel?.id}`)
      //   return closeModal();
      // }
      // return 'Failed to update';
    }

    // console.log('CHANNEL DATA TO BACKEND', channelData)
    const created = await dispatch(createChannel(channelData));
// !!!! ——————————————————————————————————————————————————————————————————————————————————
    await console.log('CREATED ————————————————————', created);
// !!!! ——————————————————————————————————————————————————————————————————————————————————
    if (created?.errors) setErrors(created?.errors);
    return closeModal();
    // if (created?.id) return closeModal();
    // if (created?.id) {
    //   history.push(`/channels/${created?.id}`);
    //   return closeModal();
    // }
    // return 'Failed to Create';
  }

  return (
    <form className='channel-form-container' onSubmit={handleSubmit}>
      <FormInput name='Title' state={title} setState={setTitle} />
      <FormInput name='Topic' state={topic} setState={setTopic} />
      <button type='submit'>Submit</button>
      <FormErrors errors={errors} />
    </form>
  )
}

export default ChannelForm;
