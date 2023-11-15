import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message, Dropdown, Space, Typography, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';

import { logoutUser } from '../../../redux/slices/userSlice';


function LoginButton({modal, openModal}) {
  const user = useSelector((state) => state.user?.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div>
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
            modal === 'numberModal' ? 'text-blue-500' : ''
          }`}
          type="primary"
          onClick={() => openModal('numberModal')}
        >
          <UserOutlined className="text-2xl" />
          <div className="cursor-pointer ml-2 text-base">
            <span>Tài Khoản</span>
          </div>
        </div>
      )}
    </div>
  );
}
LoginButton.propTypes ={
  modal : PropTypes.func.isRequired,
  openModal : PropTypes.func.isRequired,
}
export default LoginButton;
