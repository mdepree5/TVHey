import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
// todo ——————————————————————————————————————————————————————————————————————————————————
import {deleteChannel} from '../../store/channel';
import './Buttons.css'
// todo ——————————————————————————————————————————————————————————————————————————————————

export const DeleteButton = ({ thisId, deleteThunk, config }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  config = { buttonName: 'Delete', newRoute: null, ...config }

  const handleDelete = async () => {
    const deleted = await dispatch(deleteThunk(thisId));
    return config.newRoute ? history.push(config.newRoute) : deleted;
  }

  return (
    <button className='delete' onClick={handleDelete}>{config.buttonName}</button>
  )
}

export const DeleteChannelButton = ({ channelId }) => (
  <DeleteButton thisId={channelId} deleteThunk={deleteChannel} config={{  buttonName: 'x', newRoute: '/' }} />
)
