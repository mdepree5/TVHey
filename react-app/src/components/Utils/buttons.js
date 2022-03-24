import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
// todo ——————————————————————————————————————————————————————————————————————————————————
import {deleteMessage} from '../../store/message';
import {deleteChannel} from '../../store/channel';
import {Icon} from './icons';
import './utils.css'
// todo ——————————————————————————————————————————————————————————————————————————————————

export const DeleteButton = ({ thisId, deleteThunk, config }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  config = { buttonName: 'Delete', newRoute: null, ...config }

  const handleDelete = async () => {
    const deleted = await dispatch(deleteThunk(thisId));
    return config.newRoute ? history.push(config.newRoute) : deleted;
  }

  return <Icon onClick={handleDelete} iconName='delete'/>
}

export const DeleteChannelButton = ({channelId}) => (
  <DeleteButton thisId={channelId} deleteThunk={deleteChannel} config={{newRoute: '/'}} />
)

export const DeleteMessageButton = ({messageId}) => (
  <DeleteButton thisId={messageId} deleteThunk={deleteMessage} />
)
