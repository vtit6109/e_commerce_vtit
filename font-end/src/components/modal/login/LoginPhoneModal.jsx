import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { checkPhoneNumber } from '../../../redux/slices/userSlice';

import facebookLogin from '../../../assets/icon/loginIcon/facebook.svg';
import googleLogin from '../../../assets/icon/loginIcon/google.svg';

function LoginPhoneModal({ isOpen, onClose, onSuccess, onOpenEmail }) {
    // Sử dụng hooks
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handlePhoneSubmit = async (e) => {
      e.preventDefault();
      const resultAction = await dispatch(
        checkPhoneNumber({ phonenumber: phoneNumber }),
      );
      if (checkPhoneNumber.fulfilled.match(resultAction)) {
        setPhoneNumber('');
        onSuccess();
      } else {
        message.error({
          content: 'Số điện thoại không tồn tại. Vui lòng thử lại.',
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
            <h2 className="text-2xl font-bold mb-2">Xin Chào</h2>
            <p className="text-base">Đăng nhập hoặc Tạo tài khoản</p>
          </div>
          <div className="text-center mb-2">
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="text"
                className="w-full border-b-[1px] p-3 text-xl outline-none "
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                className="w-full text-center bg-red-500 text-xl p-3 text-white font-bold rounded-md mt-8 mb-3"
                key="submit"
                type="submit"
              >
                Tiếp Tục
              </button>
            </form>
            <div
              onClick={onOpenEmail}
              className="text-blue-500 cursor-pointer hover:underline"
              href=""
            >
              Đăng nhập bằng Email
            </div>
  
            <div className="flex flex-col items-center mt-20">
              <div className="flex items-center justify-center w-full">
                <span className="h-[1px] w-full bg-gray-100"></span>
                <div className="w-full text-center">Hoặc tiếp tục bằng</div>
                <span className="h-[1px] w-full bg-gray-100"></span>
              </div>
              <div className="flex gap-4 mt-2 cursor-pointer">
                <img src={facebookLogin} alt="" />
                <img src={googleLogin} alt="" />
              </div>
            </div>
          </div>
          <div className="text-xs">
            Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
            <a className="underline hover:text-blue-500 hover:underline" href="">
              điều khoản sử dụng
            </a>{' '}
            và{' '}
            <a className="underline hover:text-blue-500 hover:underline" href="">
              Chính sách bảo mật thông tin cá nhân
            </a>{' '}
          </div>
        </div>
      </Modal>
    );
  }
  
  LoginPhoneModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onOpenEmail: PropTypes.func.isRequired,
  };
  
  export default LoginPhoneModal;