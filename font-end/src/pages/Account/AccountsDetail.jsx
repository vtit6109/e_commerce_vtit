import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Col, Row, Menu } from 'antd';

import { BsFillPersonVcardFill, BsFillHeartFill } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { FaThList } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';

import EditAccount from './EditAccount';
import Address from './Address';
import Order from './Order';
import Wishlist from './Wishlist';
import Review from './Review';

const AccountsDetail = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const selectedKey = currentPath.split('/')[2];
  const items = [
    {
      key: 'edit',
      label: (
        <Link className="flex items-center" to={'/customer/edit'}>
          {' '}
          <span className="mr-4">
            {' '}
            <BsFillPersonVcardFill
              style={{ fontSize: '20px' }}
            />
          </span>{' '}
          <span>Thông tin tài khoản</span>{' '}
        </Link>
      ),
    },
    {
      key: 'address',
      label: (
        <Link className="flex items-center" to={'/customer/address'}>
          {' '}
          <span className="mr-4">
            {' '}
            <FaLocationDot style={{ fontSize: '20px' }} />
          </span>{' '}
          <span>Địa chỉ giao hàng</span>{' '}
        </Link>
      ),
    },
    {
      key: 'order',
      label: (
        <Link className="flex items-center" to={'/customer/order'}>
          {' '}
          <span className="mr-4">
            {' '}
            <FaThList style={{ fontSize: '20px' }} />
          </span>{' '}
          <span>Quản lý đơn hàng</span>{' '}
        </Link>
      ),
    },
    {
      key: 'wishlist',
      label: (
        <Link className="flex items-center" to={'/customer/wishlist'}>
          {' '}
          <span className="mr-4">
            {' '}
            <BsFillHeartFill style={{ fontSize: '20px' }} />
          </span>{' '}
          <span>Sản phẩm yêu thích</span>{' '}
        </Link>
      ),
    },
    {
      key: 'review',
      label: (
        <Link className="flex items-center" to={'/customer/review'}>
          {' '}
          <span className="mr-4">
            {' '}
            <MdRateReview style={{ fontSize: '20px' }} />
          </span>{' '}
          <span>Đánh giá của bạn</span>{' '}
        </Link>
      ),
    },
  ];

  return (
    <>
      <Row className="px-4">
        <Col justify={'start'} span={6} className="user-select-none px-10">
          <Menu
            style={{
              backgroundColor: 'rgba(241, 245, 249)',
            }}
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={18}>
          <Routes>
            <Route path="edit" element={<EditAccount />} />
            <Route path="order" element={<Order />} />
            <Route path="address" element={<Address />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="review" element={<Review />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default AccountsDetail;
