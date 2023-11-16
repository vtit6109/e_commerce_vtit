import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';
import { StarOutlined, CheckCircleOutlined } from '@ant-design/icons';

const CardComponent = ({ productItems }) => {
  return productItems.map((item, index) => {
    return (
      <div
        className="transform transition-transform duration-500 ease-in-out"
        key={index}
      >
        <Link
          to={`/${item.category?.catalog?.url}/${item.category?.url}/${item._id}`}
        >
          <Card
            hoverable
            style={{
              width: 174,
              height: 329,
            }}
            bodyStyle={{
              padding: 10,
            }}
            cover={
              <img
                className="scale-90 transition-all hover:scale-100 p-[10px]"
                alt="Products"
                src={`${item.imgUrl[0]}`}
              />
            }
          >
            <div
              className={
                item.active
                  ? 'flex items-center text-blue-600 font-bold'
                  : 'text-transparent'
              }
            >
              <CheckCircleOutlined className="" />
              <span className="px-1">Active</span>
            </div>
            <div>
              <p className="line-clamp-2 ">{item.productDescription}</p>
            </div>
            <div className="flex justify-between mt-1">
              <div className="text-xs">
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <React.Fragment key={index}>
                      <StarOutlined
                        style={{
                          color: index < item.favoriteStar ? '#FFD700' : '',
                        }}
                      />
                    </React.Fragment>
                  ))}
              </div>
              <div className="text-xs italic">
                Đã bán {item.sold}
                {item.sold > 999 ? '+' : ''}
              </div>
            </div>
            <div>
              <div className="text-base font-semibold">
                {item.productPrice.toLocaleString('vn')}
                <span className="text-xs">đ</span>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    );
  });
};

CardComponent.propTypes = {
  productItems: PropTypes.array,
};

export default CardComponent;
