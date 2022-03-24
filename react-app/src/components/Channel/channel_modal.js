import {useState} from 'react';
import {Modal} from '../../context/Modal';
import ChannelForm from './channel_form';
import {Icon} from '../Utils/icons';

// todo ——————————————————————————————————————————————————————————————————————————————————

function ChannelFormModal({icon=false, name='Create', edit=false, channel=null}) {
  const [showModal, setShowModal] = useState(false);

  
  return (<>
    {icon ? <Icon onClick={e=> setShowModal(true)} iconName='edit'/>
      :
      <button className={edit ? 'edit' : ''} onClick={e => setShowModal(true)}>{name}</button> 
    }
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <ChannelForm name={name} edit={edit} channel={channel} closeModal={() => setShowModal(false)} />
      </Modal>
    )}
  </>);
}

export default ChannelFormModal;
