import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserOnServer } from '../../redux/slices/userSlice';

import { Modal, message, DatePicker, Radio, Select, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BsTelephone, BsShieldCheck } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';
import facebookLogo from '../../assets/icon/loginIcon/facebook.svg';
import googleLogo from '../../assets/icon/loginIcon/google.svg';

const EditAccount = () => {
  const user = useSelector((state) => state.user?.user);
  const [userState, setUserState] = useState(user);
  const dispatch = useDispatch();
  const dateFormat = 'DD/MM/YYYY';
  const [isPhoneUpdateModal, setIsPhoneUpdateModal] = useState(false);
  const [isEmailUpdateModal, setIsEmailUpdateModal] = useState(false);
  const [isPasswordUpdateModal, setIsPasswordUpdateModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showModal = (setModal) => () => {
    setModal(true);
  };
  const closeModal = (setModal) => () => {
    setModal(false);
  };

  const handleChangePersonal = (value, field) => {
    if (
      field === 'useremail' ||
      field === 'phonenumber' ||
      field === 'password'
    ) {
      setUserState({
        ...userState,
        [field]: value.target.value,
      });
    } else {
      setUserState({
        ...userState,
        personalDetails: {
          ...userState.personalDetails,
          [field]:
            typeof value === 'object' && value.target
              ? value.target.value
              : value,
        },
      });
    }
  };

  const handleSubmitPersonal = async (event) => {
    event.preventDefault();
    const updatedUser = { ...userState };
    updatedUser.personalDetails.name = userState.personalDetails.name;
    updatedUser.personalDetails.avatar = userState.personalDetails.avatar;
    updatedUser.personalDetails.nickname = userState.personalDetails.nickname;
    updatedUser.personalDetails.gender = userState.personalDetails.gender;
    updatedUser.personalDetails.birthday = userState.personalDetails.birthday;
    updatedUser.personalDetails.nationality =
      userState.personalDetails.nationality;
    dispatch(updateUserOnServer(updatedUser));
    message.success('Cập nhật thành công');
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    const updatedUser = { ...userState };
    updatedUser.useremail = userState.useremail;
    dispatch(updateUserOnServer(updatedUser));
    setIsEmailUpdateModal(false);
    message.success('Cập nhật thành công');
  };
  const handleSubmitPhone = async (event) => {
    event.preventDefault();
    const updatedUser = { ...userState };
    updatedUser.phonenumber = userState.phonenumber;
    dispatch(updateUserOnServer(updatedUser));
    setIsPhoneUpdateModal(false);
    message.success('Cập nhật thành công');
  };
  const handleSubmiPassowrd = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      message.error('Mật khẩu mới và mật khẩu xác nhận không khớp');
      return;
    }
    if (oldPassword !== userState.password) {
      message.error('Mật khẩu cũ không đúng');
      return;
    }
    const updatedUser = { ...userState };
    updatedUser.password = confirmPassword;
    dispatch(updateUserOnServer(updatedUser));
    setIsPasswordUpdateModal(false);
    message.success('Cập nhật mật khẩu thành công');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  return (
    <>
      {userState ? (
        <div className="w-full">
          <h2 className="text-xl mb-2 font-bold">Thông tin tài khoản</h2>
          <div className="flex bg-white rounded-md shadow-sm">
            <div className="w-3/5 p-4">
              <div className="mb-4 text-base font-bold">Thông tin cá nhân</div>
              <div className="flex pl-2">
                <img
                  className="h-[104px] w-[104px] mr-4 rounded-full border-2 border-blue-400"
                  src={userState.personalDetails.avatar}
                  alt=""
                />
                <form onSubmit={handleSubmitPersonal}>
                  <ul className="">
                    <li className="flex mb-8 text-sm items-center">
                      <span className="w-[110px]">Họ và Tên</span>{' '}
                      <input
                        className="w-full border-[1px] rounded-md px-3 py-[10px]"
                        type="text"
                        value={userState.personalDetails.name}
                        onChange={(event) =>
                          handleChangePersonal(event, 'name')
                        }
                      />
                    </li>
                    <li className="flex mb-8 text-sm items-center">
                      <span className="w-[110px]">Nickname</span>{' '}
                      <input
                        className="w-full border-[1px] rounded-md px-3 py-[10px]"
                        type="text"
                        value={userState.personalDetails.nickname}
                        onChange={(event) =>
                          handleChangePersonal(event, 'nickname')
                        }
                      />
                    </li>
                    <li className="flex mb-8 text-sm items-center">
                      <span className="w-[110px]">Giới tính</span>
                      <Radio.Group
                        name="radiogroup"
                        defaultValue={userState.personalDetails?.gender}
                        onChange={(event) =>
                          handleChangePersonal(event, 'gender')
                        }
                      >
                        <Radio value={'1'}>Nam</Radio>
                        <Radio value={'2'}>Nữ</Radio>
                      </Radio.Group>
                    </li>
                    <li className="flex mb-8 text-sm items-center">
                      <span className="w-[110px]">Ngày Sinh</span>
                      <div className="">
                      <DatePicker
                        className="px-3 py-[10px] w-full"
                        format={dateFormat}
                        defaultValue={dayjs(userState.personalDetails?.birthday, dateFormat)}
                        onChange={(date, dateString) =>
                          handleChangePersonal(dayjs(dateString).format(dateFormat), 'birthday')
                        }
                      />
                      </div>
                    </li>
                    <li className="flex mb-8 text-sm items-center">
                      <span className="w-[110px]">Quốc tịch</span>
                      <Select
                        className="h-11 w-[169px]"
                        showSearch
                        placeholder="Chọn quốc gia"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        defaultValue={userState.personalDetails?.nationality}
                        onChange={(value) =>
                          handleChangePersonal(
                            { target: { value } },
                            'nationality',
                          )
                        }
                        options={[
                          {
                            value: 'us',
                            label: 'Hoa Kỳ',
                          },
                          {
                            value: 'cn',
                            label: 'Trung Quốc',
                          },
                          {
                            value: 'vn',
                            label: 'Việt Nam',
                          },
                        ]}
                      />
                    </li>
                    <button className="ml-[110px] w-40 h-10 px-1 py-[1px] bg-blue-500 text-white rounded-md font-bold">
                      Lưu Xác Nhận
                    </button>
                  </ul>
                </form>
              </div>
            </div>
            <span className="border-l-[1px] my-4"></span>
            <ul className="w-2/5 p-4">
              <li>
                <div className="mb-4 text-base font-bold">
                  Số điện thoại và Email
                </div>
                <ul className="text-base pl-2">
                  <li className="flex justify-between items-center py-4 border-b-[1px] border-gray-100">
                    <div className="flex items-start">
                      <BsTelephone
                        style={{ fontSize: '20px', marginTop: '4px' }}
                      />
                      <div className="flex flex-col ml-2">
                        <span>Số điện thoại</span>
                        <span>{userState.phonenumber}</span>
                      </div>
                    </div>
                    <button
                      onClick={showModal(setIsPhoneUpdateModal)}
                      className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 border-blue-500"
                    >
                      Cập nhật
                    </button>
                  </li>
                  <li className="flex justify-between items-center py-4">
                    <div className="flex items-start">
                      <MdOutlineMail
                        style={{ fontSize: '20px', marginTop: '4px' }}
                      />
                      <div className="flex flex-col ml-2">
                        <span>Địa chỉ Email</span>
                        <span>{userState.useremail}</span>
                      </div>
                    </div>
                    <button
                      onClick={showModal(setIsEmailUpdateModal)}
                      className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 border-blue-500"
                    >
                      Cập nhật
                    </button>
                  </li>
                  <Modal
                    className="relative"
                    open={isPhoneUpdateModal}
                    onOk={handleSubmitPhone}
                    closeIcon={false}
                    footer={false}
                  >
                    <button
                      className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
                      onClick={closeModal(setIsPhoneUpdateModal)}
                    >
                      <CloseOutlined />
                    </button>
                    <form onSubmit={handleSubmitPhone}>
                      <input
                        type="text"
                        className="w-full border-b-[1px] p-3 text-xl outline-none "
                        placeholder="Nhập mã xác thực"
                        value={userState.phonenumber}
                        onChange={(event) =>
                          handleChangePersonal(event, 'phonenumber')
                        }
                      />
                      <button
                        className="w-full text-center bg-red-500 text-xl p-3 text-white font-bold rounded-md mt-8 mb-3"
                        type="submit"
                      >
                        Xác Nhận Thay Đổi
                      </button>
                    </form>
                  </Modal>
                  <Modal
                    className="relative"
                    open={isEmailUpdateModal}
                    onOk={handleSubmitEmail}
                    closeIcon={false}
                    footer={false}
                  >
                    <button
                      className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
                      onClick={closeModal(setIsEmailUpdateModal)}
                    >
                      <CloseOutlined />
                    </button>
                    <form onSubmit={handleSubmitEmail}>
                      <input
                        type="text"
                        className="w-full border-b-[1px] p-3 text-xl outline-none "
                        placeholder="Nhập mã xác thực"
                        value={userState.useremail}
                        onChange={(event) =>
                          handleChangePersonal(event, 'useremail')
                        }
                      />
                      <button
                        className="w-full text-center bg-red-500 text-xl p-3 text-white font-bold rounded-md mt-8 mb-3"
                        type="submit"
                      >
                        Xác Nhận Thay Đổi
                      </button>
                    </form>
                  </Modal>
                  <Modal
                    className="relative"
                    open={isPasswordUpdateModal}
                    onOk={handleSubmiPassowrd}
                    closeIcon={false}
                    footer={false}
                  >
                    <button
                      className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
                      onClick={closeModal(setIsPasswordUpdateModal)}
                    >
                      <CloseOutlined />
                    </button>
                    <form onSubmit={handleSubmiPassowrd}>
                      <input
                        type="password"
                        className="w-full border-b-[1px] p-3 text-xl outline-none "
                        placeholder="Nhập mật khẩu cũ"
                        value={oldPassword}
                        onChange={(event) => setOldPassword(event.target.value)}
                      />
                      <input
                        type="password"
                        className="w-full border-b-[1px] p-3 text-xl outline-none "
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                      />
                      <input
                        type="password"
                        className="w-full border-b-[1px] p-3 text-xl outline-none "
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                      />
                      <button
                        className="w-full text-center bg-red-500 text-xl p-3 text-white font-bold rounded-md mt-8 mb-3"
                        type="submit"
                      >
                        Xác Nhận Thay Đổi
                      </button>
                    </form>
                  </Modal>
                </ul>
              </li>
              <li className="my-2">
                <div className="mb-4 text-base font-bold">Bảo mật</div>
                <ul className="text-base pl-2">
                  <li className="flex justify-between items-center py-4 border-b-[1px] border-gray-100">
                    <div className="flex items-start">
                      <AiOutlineLock style={{ fontSize: '20px' }} />
                      <div className="flex flex-col ml-2">
                        <span>Thiết lập mật khẩu</span>
                      </div>
                    </div>
                    <button
                      onClick={showModal(setIsPasswordUpdateModal)}
                      className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 border-blue-500"
                    >
                      Cập nhật
                    </button>
                  </li>
                  <li className="flex justify-between items-center py-4 ">
                    <div className="flex items-start">
                      <BsShieldCheck style={{ fontSize: '20px' }} />
                      <div className="flex flex-col ml-2">
                        <span>Thiết mã PIN</span>
                      </div>
                    </div>
                    <button className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 border-blue-500">
                      Cập nhật
                    </button>
                  </li>
                </ul>
              </li>
              <li className="my-2">
                <div className="mb-4 text-base font-bold">
                  Liên kết và mạng xã hội
                </div>
                <ul className="text-base pl-2">
                  <li className="flex justify-between items-center py-4 border-b-[1px] border-gray-100">
                    <div className="flex items-center">
                      <img className="w-6 h-6" src={facebookLogo} alt="" />
                      <div className="flex flex-col ml-2">
                        <span>Facebook</span>
                      </div>
                    </div>
                    {user.personalDetails.link?.facebooklink !== '' ? (
                      <button className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 bg-slate-100 border-gray-100">
                        Đã liên kết
                      </button>
                    ) : (
                      <button className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 border-blue-500">
                        Cập nhật
                      </button>
                    )}
                  </li>
                  <li className="flex justify-between items-center py-4 ">
                    <div className="flex items-center">
                      <img className="w-6 h-6" src={googleLogo} alt="" />
                      <div className="flex flex-col ml-2">
                        <span>Google</span>
                      </div>
                    </div>
                    {user.personalDetails.link?.googlelink !== '' ? (
                      <button className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 bg-slate-100 border-gray-100">
                        Đã liên kết
                      </button>
                    ) : (
                      <button className="rounded-md border-[1px] text-sm px-3 h-[26px] text-blue-500 border-blue-500">
                        Cập nhật
                      </button>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default EditAccount;
