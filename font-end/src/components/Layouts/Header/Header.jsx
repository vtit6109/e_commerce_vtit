import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useModal from '../../../hooks/useModal';

import { Col, Row, Badge } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';

import ButtonInputSearch from './ButtonInputSearch';
import LoginModal from '../../modal/login/Login';
import LoginBtn from './LoginBtn';

const HeaderComponent = () => {
  const location = useLocation();
  const { modal, openModal, closeModal } = useModal();
  const cart = useSelector((state) => state.cart.cart);
  const cartQty = cart && cart.products ? cart.products.length : 0;

  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/carts';

  return (
    <header>
      <Row className=" flex items-center text-gray-500">
        <Col span={4}>
          <div className="text-[32px] font-extrabold">
            <span className="font-titan-one">ECOMMERCE</span>
          </div>
        </Col>
        <Col span={12} className="px-10">
          <ButtonInputSearch />
        </Col>
        <Col span={8}>
          <Row className="flex items-center font-bold cursor-pointer">
            <Col span={16} className="flex justify-around px-1">
              <Link
                to={'/'}
                className={`flex items-center ${
                  isHomePage ? 'text-blue-500' : ''
                }`}
              >
                <HomeOutlined className="text-2xl" />
                <span className="ml-2 text-base">Trang Chủ</span>
              </Link>
              <LoginBtn openModal={openModal} modal={modal} />
              <LoginModal
                modal={modal}
                openModal={openModal}
                closeModal={closeModal}
                path={'/'}
              />
            </Col>
            <Col className="flex cursor-pointer px-1 items-end">
              <Badge count={cartQty} size='small'>
                <Link
                  to={'/carts'}
                  className={`
                ${isCartPage ? 'text-blue-500' : ''}
                `}
                >
                  <ShoppingCartOutlined className="text-2xl " />
                  <span className="ml-2 text-base">Giỏ hàng</span>
                </Link>
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default HeaderComponent;
