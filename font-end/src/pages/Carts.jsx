import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  getCart,
} from '../redux/slices/cartSlice';

import useModal from '../hooks/useModal';
import LoginModal from '../components/modal/login/Login';
import { CiLogin } from 'react-icons/ci';
import CartsList from './../components/Carts/CartsList';

const Carts = () => {
  const dispatch = useDispatch();
  const { modal, openModal, closeModal } = useModal();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user?.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch, userId]);

  if (!userId) {
    return (
      <div className="text-center mt-10">
        <div className="flex flex-col">
          <div className="flex justify-center items-center text-lg">
            <CiLogin className="mx-2 text-2xl" />
            <span>Bạn cần đăng nhập để xem giỏ hàng</span>
          </div>
          <button
            onClick={() => openModal('numberModal')}
            className="bg-blue-500 w-28 p-2 text-white font-bold rounded-md mx-auto my-4"
            type="primary"
          >
            Đăng Nhập
          </button>
          <LoginModal
            modal={modal}
            openModal={openModal}
            closeModal={closeModal}
            path={'/carts'}
          />
        </div>
      </div>
    );
  }

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cursor-pointer">
      <CartsList userId={userId} />
    </div>
  );
};

export default Carts;
