import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, message } from 'antd';

import {
  addAddressOnServer,
  deleteAddressOnServer,
} from '../../redux/slices/userSlice';

import { CloseOutlined } from '@ant-design/icons';
import { BiBookAdd } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const Address = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [userState, setUserState] = useState(user);
  const [isAddressForm, setIsAddressForm] = useState(false);


  const showModal = (setModal) => () => {
    setModal(true);
  };
  const closeModal = (setModal) => () => {
    setModal(false);
  };

  const handleChangeAddNew = (value, field) => {
    setUserState({
      ...userState,
      [field]:
        typeof value === 'object' && value.target ? value.target.value : value,
    });
  };

  const handleSubmitAddnew = async (event) => {
    event.preventDefault();
    const newAddress =  {
      receivername: userState.receivername,
      phonenumber: userState.phonenumber,
      street: userState.street,
      ward: userState.ward,
      district: userState.district,
      province: userState.province,
      detailaddress: userState.detailaddress,
      defaultaddress: false,
    };
    try {
      const actionResult = await dispatch(
        addAddressOnServer({ userId: user._id, address: newAddress }),
      );
      const updatedUser = actionResult.payload;
      message.success('Thêm mới thành công');
      setUserState(updatedUser);
      setIsAddressForm(false);
    } catch (error) {
      message.error('Có lỗi xảy ra khi Thêm địa chỉ.');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const actionResult = await dispatch(
        deleteAddressOnServer({ userId: user._id, addressId: addressId }),
      );
      const updatedUser = actionResult.payload;
      message.success('Địa chỉ đã được xóa thành công');
      setUserState(updatedUser);
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa địa chỉ.');
    }
  };
  return (
    <>
      <div>
        <div className="w-full">
          <h2 className="text-xl mb-2 font-bold">Sổ địa chỉ</h2>
          <button
            onClick={showModal(setIsAddressForm)}
            className="flex justify-center mb-3 items-center w-full border-dashed border-[1px] p-5 bg-white shadow-sm hover:opacity-90 rounded-md"
          >
            <span className="mx-2">
              <BiBookAdd
                style={{ color: 'rgb(59 130 246)', fontSize: '16px' }}
              />
            </span>
            <div className="text-base text-blue-500">Thêm địa chỉ mới</div>
          </button>
          <ul>
            {[...userState.shippingaddress] // tạo ra mảng mới mà không thay đổi cấu trúc mảng gốc
              .sort((a, b) => b.defaultaddress - a.defaultaddress)
              .map((address) => {
                return (
                  <li
                    key={address._id}
                    className="relative flex flex-col p-4 bg-white mb-2 shadow-sm rounded-md"
                  >
                    <div className="flex">
                      <h3 className="uppercase font-bold">
                        {address.receivername}
                      </h3>
                      {address.defaultaddress === true && (
                        <div className="flex ml-3 items-center text-xs text-green-500">
                          <AiOutlineCheckCircle />
                          <span className="ml-1">Địa chỉ mặc định</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Địa chỉ: </span>
                      {address.detailaddress != '' &&
                        address.detailaddress + ' - '}
                      {address.street + ' - '}
                      {address.ward + ' - '} {address.district + ' - '}
                      {address.province}
                    </div>
                    <div>
                      <span className="font-bold">Số điện thoại: </span>
                      {address.phonenumber}
                    </div>
                    <div className="absolute right-0 top-0 p-6">
                      <button className="flex items-center hover:underline text-blue-500 mb-3">
                        <span className="mr-2">
                          <BsPencilSquare />
                        </span>
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="flex items-center hover:underline text-blue-500"
                      >
                        <span className="mr-2">
                          <BsTrash />
                        </span>
                        Xóa
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
          <Modal
            width="800px"
            className="relative"
            open={isAddressForm}
            onOk={handleSubmitAddnew}
            closeIcon={false}
            footer={false}
          >
            <button
              className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
              onClick={closeModal(setIsAddressForm)}
            >
              <CloseOutlined />
            </button>
            <form onSubmit={handleSubmitAddnew}>
              <ul className="p-2 text-sm">
                <h2 className="text-xl mb-4">Tạo sổ địa chỉ</h2>
                <li className="flex items-center mb-3">
                  <span className="w-[200px]">Họ và tên:</span>
                  <input
                    type="text"
                    className="w-full border-[1px] p-2 outline-none rounded-md "
                    placeholder="Nhập họ tên người nhận "
                    onChange={(event) =>
                      handleChangeAddNew(event, 'receivername')
                    }
                  />
                </li>
                <li className="flex items-center mb-3">
                  <span className="w-[200px]">Số điện thoại:</span>
                  <input
                    type="text"
                    className="w-full border-[1px] p-2 outline-none rounded-md "
                    placeholder="Nhập số điện thoại người nhận "
                    onChange={(event) =>
                      handleChangeAddNew(event, 'phonenumber')
                    }
                  />

                </li>
                <li className="flex items-center mb-3">
                  <span className="w-[200px]">Khu Phố/ Thôn/ Ấp:</span>
                  <input
                    type="text"
                    className="w-full border-[1px] p-2 outline-none rounded-md "
                    placeholder="Tên Khu Phố/ Thôn/ Ấp"
                    onChange={(event) => handleChangeAddNew(event, 'street')}
                  />
                </li>
                <li className="flex items-center mb-3">
                  <span className="w-[200px]"> Phường/ Xã/ Thị Trấn:</span>
                  <input
                    type="text"
                    className="w-full border-[1px] p-2 outline-none rounded-md "
                    placeholder="Tên Xã/ Phường/ Thị Trấn"
                    onChange={(event) => handleChangeAddNew(event, 'ward')}
                  />
                </li>
                <li className="flex items-center mb-3">
                  <span className="w-[200px]">Quận/ Huyện:</span>
                  <input
                    type="text"
                    className="w-full border-[1px] p-2 outline-none rounded-md "
                    placeholder="Tên Quận/ Huyện"
                    onChange={(event) => handleChangeAddNew(event, 'district')}
                  />
                </li>
                <li className="flex items-center mb-3">
                  <span className="w-[200px]">Tỉnh/ Thành Phố:</span>
                  <input
                    type="text"
                    className="w-full border-[1px] p-2 outline-none rounded-md "
                    placeholder="Tên Tỉnh/ Thành Phố"
                    onChange={(event) => handleChangeAddNew(event, 'province')}
                  />
                </li>
                <li className="flex items-center mb-3">
                  <span className="w-[200px]">Chi Tiết</span>
                  <input
                    type="comment"
                    className="w-full border-[1px] p-2 outline-none rounded-md "
                    placeholder="Nhập Địa chỉ"
                    onChange={(event) =>
                      handleChangeAddNew(event, 'detailaddress')
                    }
                  />
                </li>
              </ul>
              <button
                className="w-full text-center bg-red-500 text-xl p-3 text-white font-bold rounded-md mt-8 mb-3"
                type="submit"
              >
                Xác Nhận
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default Address;
