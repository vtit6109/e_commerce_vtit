import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../redux/slices/cartSlice';

import { CiLogin } from 'react-icons/ci';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user?.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch, userId]);

  if (userId == null) {
    return (
      <>
        <div className="text-center mt-10">
          <div className="flex flex-col">
            <div className="flex justify-center items-center text-lg">
              <CiLogin className="mx-2 text-2xl" />
              <span>Bạn cần đăng nhập để xem giỏ hàng</span>
            </div>
            <button
              className="bg-blue-500 w-28 p-2 text-white font-bold rounded-md mx-auto my-4"
              type="primary"
            >
              Đăng Nhập
            </button>
          </div>
        </div>
      </>
    );
  }
  if (!cart) {
    return <div>Loading...</div>;
  }

  return <div></div>;
};

export default Cart;
