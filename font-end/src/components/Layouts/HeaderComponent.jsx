// import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Col, Row, Input, Button } from 'antd';
import { SearchOutlined, HomeOutlined } from '@ant-design/icons';

import { ShoppingCartOutlined } from '@ant-design/icons';

import LoginForm from '../modal/login/LoginForm';

const ButtonInputSearch = () => {
  return (
    <div className="flex items-center border-[1px] border-gray-300 rounded-lg  bg-white">
      <span className=" opacity-75 text-[18px] mx-4">
        <SearchOutlined />
      </span>
      <Input
        bordered={false}
        style={{ backgroundColor: '#ffff', borderRadius: '0px' }}
        placeholder="Bạn tìm gì ..."
        size="large"
        allowClear
      />
      <span className="border-[1px] border-gray-300 h-[30px]"></span>
      <Button
        className="hover:text-blue-500"
        style={{
          display: 'flex',
          borderRadius: '0px 8px 8px 0px',
          border: 'none',
          alignItems: 'center',
          background: '#ffff',
          fontWeight: '600',
          color: '#9C9C9C',
        }}
        size={'large'}
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

const HeaderComponent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
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
              <LoginForm />
            </Col>
            <Col className="flex cursor-pointer px-1 items-end">
              <ShoppingCartOutlined className="text-2xl " />
              <span className="ml-2 text-base">Giỏ hàng</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default HeaderComponent;
