// Import các thư viện và hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { verifyCode } from '../../../redux/slices/userSlice';

function VerificationModal({ isOpen, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(verifyCode({ code: verificationCode }));
    if (verifyCode.fulfilled.match(resultAction)) {
      setVerificationCode('');
      onSuccess();
    } else {
      message.error({
        content: 'Mã xác thực không chính xác. Vui lòng thử lại.',
        key: 'updatable',
      });
    }
  };

  return (
    <Modal
      className="relative"
      open={isOpen}
      onOk={onClose}
      closeIcon={false}
      footer={false}
    >
      <button
        className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
        onClick={onClose}
      >
        <CloseOutlined />
      </button>

      <form onSubmit={handleVerificationSubmit}>
        <input
          type="text"
          className="w-full border-b-[1px] p-3 text-xl outline-none "
          placeholder="Nhập mã xác thực"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button
          className="w-full text-center bg-red-500 text-xl p-3 text-white font-bold rounded-md mt-8 mb-3"
          key="submit"
          type="submit"
        >
          Xác nhận
        </button>
      </form>
    </Modal>
  );
}

VerificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default VerificationModal;
