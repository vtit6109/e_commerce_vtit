import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BiShow, BiHide } from '@react-icons/all-files/bi/BiShow';

import { loginWithEmail } from '../../../redux/slices/userSlice';

const LoginEmailModal = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setShowPassword] = useState(false);

  const toggleModal = (modalStateSetter) => () =>
    modalStateSetter((prevState) => !prevState);
  const handleShowPassword = toggleModal(setShowPassword);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      loginWithEmail({ useremail: useremail, password: password }),
    );
    if (loginWithEmail.fulfilled.match(resultAction)) {
      setUseremail('');
      setPassword('');
      onSuccess();
    } else {
      message.error({
        content: 'Thông tin đăng nhập không chính xác. Vui lòng thử lại.',
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

      <div className="px-5">
        <div className="mb-5">
          <h2 className="text-2xl font-bold mb-2">Đăng nhập bằng email</h2>
          <p className="text-base">Nhập email và mật khẩu tài khoản</p>
        </div>
        <div className="text-center">
          <form onSubmit={handleEmailSubmit}>
            <input
              className="w-full border-b-[1px] p-3 text-xl outline-none "
              placeholder="abc@email.com"
              type="email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
            />
            <div className="relative">
              <input
                className="w-full border-b-[1px] p-3 text-xl outline-none"
                placeholder="Nhập mật khẩu"
                type={`${!isShowPassword ? 'password' : 'text'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="absolute top-1/2 right-1 cursor-pointer"
                onClick={handleShowPassword}
              >
                {isShowPassword ? (
                  <BiHide className="text-xl opacity-50 user-select-none" />
                ) : (
                  <BiShow className="text-xl opacity-50 user-select-none" />
                )}
              </div>
            </div>
            <button
              className="w-full text-center bg-red-500 text-xl p-3 text-white font-bold rounded-md mt-8 mb-3"
              type="submit"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="flex flex-col items-start mt-5">
            <a className=" text-blue-500 hover:underline">Quên mật khẩu?</a>
            <div>
              <span>Chưa có tài khoản?</span>
              <a className="mx-2 text-blue-500 hover:underline">
                Đăng ký tài khoản
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

LoginEmailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default LoginEmailModal;
