import {useState} from 'react';
import {Modal} from '../../context/Modal';
import ChannelForm from './channel_form';
// todo ——————————————————————————————————————————————————————————————————————————————————

function ChannelFormModal({name='Create', edit=false, channel=null}) {
  const [showModal, setShowModal] = useState(false);

  return (<>
    <button className='publish-modal-button' onClick={e => setShowModal(true)}>{name}</button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <ChannelForm name={name} edit={edit} channel={channel} closeModal={() => setShowModal(false)} />
      </Modal>
    )}
  </>);
}

export default ChannelFormModal;
