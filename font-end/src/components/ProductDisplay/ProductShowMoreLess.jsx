import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CaretDownOutlined,
  CaretUpOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import Card from '../../shared/Card';
const ProductShowMoreLess = ({ data }) => {
  const [numProductsToShow, setNumProductsToShow] = useState(6);
  const [showLessButton, setShowLessButton] = useState(false);

  const handleShowMore = () => {
    setNumProductsToShow(numProductsToShow + 5);
    setShowLessButton(true);
  };

  const handleShowLess = () => {
    setNumProductsToShow(6);
    setShowLessButton(false);
  };
  return (
    <>
      <div
        className="grid justify-center gap-x-2 gap-y-5 grid-cols-6 mx-4 p-4 border-[1px] border-solid rounded-[10px] transition-all duration-500 overflow-hidden"
        style={{
          maxHeight: `${Math.ceil(numProductsToShow / 6) * 363}px`,
        }}
      >
        <Card productItems={data.slice(0, numProductsToShow)} />
        {data.length > 11 && (
          <Link
            to=""
            className="flex flex-col items-center justify-center w-[174px] h-[329px] p-[10px] border rounded-lg"
          >
            <PlusCircleOutlined style={{ fontSize: '24px' }} />
            <span className="my-2 font-bold">Xem thêm</span>
          </Link>
        )}
      </div>
      <div className="flex justify-center">
        {numProductsToShow < data.length && !showLessButton && (
          <button
            className="py-2 px-4 rounded opacity-60 hover:opacity-100"
            onClick={handleShowMore}
          >
            <CaretDownOutlined /> <span className="font-bold">Xem thêm</span>
          </button>
        )}
        {showLessButton && (
          <button
            className="py-2 px-4 rounded opacity-60 hover:opacity-100"
            onClick={handleShowLess}
          >
            <CaretUpOutlined /> <span className="font-bold">Ẩn bớt</span>
          </button>
        )}
      </div>
    </>
  );
};
ProductShowMoreLess.propTypes = {
  data: PropTypes.array.isRequired,
};
export default ProductShowMoreLess;
