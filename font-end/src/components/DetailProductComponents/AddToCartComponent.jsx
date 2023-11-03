import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { useState } from 'react';

const AddToCartComponent = ({ productId, price }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, quantity }));
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ productId, quantity }));
    alert('Tiếp tục quá trình thanh toán...');
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    setTotal((quantity + 1) * price);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotal((quantity - 1) * price);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || value >= 1) {
      setQuantity(value);
      setTotal(value * price);
    }
  };

  return (
    <div className=" flex flex-col gap-4 bg-white px-8 py-4 rounded-xl shadow-sm">
      <div className="flex flex-col text-base gap-2">
        <span className="font-bold">Số Lượng</span>
        <div className="flex ">
          <button
            onClick={decrementQuantity}
            className="px-3 py-1 border-[1px] rounded-md"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-10 mx-1 px[2px] border-[1px] text-center rounded-md"
          />
          <button
            onClick={incrementQuantity}
            className="px-3 py-1 border-[1px] rounded-md"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col text-base gap-2">
        <span className="font-bold">Tạm Tính:</span>
        <div className="text-2xl"> {total.toLocaleString('vn')} đ</div>
      </div>
      <div className="flex flex-col gap-2 text-base">
        <button
          onClick={handleBuyNow}
          className="bg-red-500 text-white w-full  p-2"
        >
          <span className=" font-bold">Mua ngay</span>
        </button>
        <button
          onClick={handleAddToCart}
          type="button"
          data-view-id="pdp_add_to_cart_button"
          className="w-full p-2 border-blue-500 border-2 text-blue-500 font-bold"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};
AddToCartComponent.propTypes = {
  productId: PropTypes.string,
  price: PropTypes.number,
};
export default AddToCartComponent;
