import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import CardComponent from '../CardComponent';

const ProductCarousel = ({ data }) => {
  const [productIndex, setProductIndex] = useState(0);
  const displayCount = 6;

  const scrollProducts = (direction) => {
    if (direction < 0 && productIndex > 0) {
      setProductIndex(Math.max(productIndex - displayCount, 0));
    } else if (direction > 0 && productIndex < data.length - displayCount) {
      setProductIndex(productIndex + displayCount);
    }
  };

  return (
    <div>
      <div className="grid relative justify-center gap-x-2 gap-y-5 grid-cols-6 mx-4 p-4 border border-solid rounded transition-all duration-500 overflow-x-auto">
        {productIndex > 0 && (
          <DoubleLeftOutlined
            className="absolute z-10 bg-gradient-to-r from-white w-8 h-full flex items-center leading-[28px] rounded-l-lg text-blue-500 left-0 justify-center hover:shadow-lg hover:opacity-100 opacity-75"
            onClick={() => scrollProducts(-1)}
          />
        )}

        <CardComponent
          productItems={data.slice(productIndex, productIndex + displayCount)}
        />
        {productIndex + displayCount >= data.length && data.length > 6 && (
          <Link
            to=""
            className="flex flex-col items-center justify-center w-[174px] h-[329px] p-[10px] border rounded-lg"
          >
            <PlusCircleOutlined style={{ fontSize: '24px' }} />
            <span className="my-2 font-bold">Xem thêm</span>
          </Link>
        )}
        {productIndex + displayCount < data.length && (
          <DoubleRightOutlined
            onClick={() => scrollProducts(1)}
            className="absolute bg-gradient-to-l from-white w-8 h-full flex items-center leading-[28px] rounded-r-lg text-blue-500 right-0 justify-center hover:shadow-lg hover:opacity-100 opacity-75"
          />
        )}
      </div>
    </div>
  );
};
ProductCarousel.propTypes = {
  data: PropTypes.array.isRequired,
};
export default ProductCarousel;
