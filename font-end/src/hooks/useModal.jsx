import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState(null);

  function openModal(modalName) {
    setModal(modalName);
  }

  function closeModal() {
    setModal(null);
  }

  return {
    modal,
    openModal,
    closeModal,
  };
}

export default useModal;
