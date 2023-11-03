import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  logoutUser,
  loginWithEmail,
  checkPhoneNumber,
  verifyCode,
} from '../../redux/slices/userSlice';

import { message, Modal, Dropdown, Space, Typography, Avatar } from 'antd';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { BiShow } from '@react-icons/all-files/bi/BiShow';
import { BiHide } from '@react-icons/all-files/bi/BiHide';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import facebookLogin from '../../assets/icon/loginIcon/facebook.svg';
import googleLogin from '../../assets/icon/loginIcon/google.svg';

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setShowPassword] = useState(false);

  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const toggleModal = (modalStateSetter) => () =>
    modalStateSetter((prevState) => !prevState);

  const showNumberModal = toggleModal(setIsModalOpen);
  const handleNumberOk = toggleModal(setIsModalOpen);
  const handleShowPassword = toggleModal(setShowPassword);
  const showEmailModal = () => {
    setIsEmailModal(true);
    setIsModalOpen(false);
  };

  const handleCloseModal = (setModal) => () => {
    setModal(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      loginWithEmail({ useremail: useremail, password: password }),
    );
    if (loginWithEmail.fulfilled.match(resultAction)) {
      message.success({ content: 'Đăng nhập thành công!', key: 'updatable' });
      setIsEmailModal(false);
      setUseremail('');
      setPassword('');
    } else
      message.error({
        content: 'Thông tin đăng nhập không chính xác. Vui lòng thử lại.',
        key: 'updatable',
      });
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      checkPhoneNumber({ phonenumber: phoneNumber }),
    );
    if (checkPhoneNumber.fulfilled.match(resultAction)) {
      setIsModalOpen(false);
      setShowVerificationForm(true);
      setPhoneNumber('');
    } else
      message.error({
        content: 'Số điện thoại không tồn tại. Vui lòng thử lại.',
        key: 'updatable',
      });
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        verifyCode({ phonenumber: phoneNumber, code: verificationCode }),
      );
      if (verifyCode.fulfilled.match(resultAction)) {
        message.success({ content: 'Đăng nhập thành công!', key: 'updatable' });
        setShowVerificationForm(false);
      } else {
        message.error({
          content: 'Mã xác thực không chính xác. Vui lòng thử lại.',
          key: 'updatable',
        });
      }
    } catch (error) {
      message.error({
        content: 'Đăng nhập thất bại. Vui lòng thử lại.',
        key: 'updatable',
      });
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    message.success('Đã đăng xuất!');
  };

  const items = [
    {
      key: '1',
      label: <Link to={'/customer/edit'}>Thông tin tài khoản</Link>,
    },
    {
      key: '2',
      label: <Link to={'/customer/order'}>Đơn hàng của tôi</Link>,
    },
    {
      key: '3',
      label: <Link to={'/customer/wishlist'}>Sản phẩm yêu thích</Link>,
    },
    {
      key: '4',
      label: (
        <button className="text-red-500" onClick={handleLogout}>
          Đăng xuất
        </button>
      ),
    },
  ];

  return (
    <>
      {user ? (
        <>
          <Dropdown
            menu={{
              items,
              selectable: true,
            }}
            icon={<CaretDownOutlined />}
          >
            <Typography.Link>
              <Space>
                <Avatar
                  className="border-e-2 border-blue-500"
                  src={user.personalDetails.avatar}
                  alt="avatar"
                />
                <span className="truncate ">Tài Khoản</span>
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        </>
      ) : (
        <div
          className={`flex items-center hover:text-blue-500 ${
            isModalOpen === true ? 'text-blue-500' : ''
          }`}
          type="primary"
          onClick={showNumberModal}
        >
          <UserOutlined className="text-2xl" />
          <div className="cursor-pointer ml-2 text-base">
            <span>Tài Khoản</span>
          </div>
        </div>
      )}

      <Modal
        className="relative"
        open={isModalOpen}
        onOk={handleNumberOk}
        closeIcon={false}
        footer={false}
      >
        <button
          className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
          onClick={handleCloseModal(setIsModalOpen)}
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
              onClick={showEmailModal}
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
            <a
              className="underline hover:text-blue-500 hover:underline"
              href=""
            >
              điều khoản sử dụng
            </a>{' '}
            và{' '}
            <a
              className="underline hover:text-blue-500 hover:underline"
              href=""
            >
              Chính sách bảo mật thông tin cá nhân
            </a>{' '}
          </div>
        </div>
      </Modal>
      <Modal
        className="relative"
        open={showVerificationForm}
        onOk={handleNumberOk}
        closeIcon={false}
        footer={false}
      >
        <button
          className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
          onClick={handleCloseModal(setShowVerificationForm)}
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
      <Modal
        className="relative"
        open={isEmailModal}
        onOk={handleEmailSubmit}
        closeIcon={false}
        footer={false}
      >
        <button
          className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
          onClick={handleCloseModal(setIsEmailModal)}
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
    </>
  );
};

export default Login;
