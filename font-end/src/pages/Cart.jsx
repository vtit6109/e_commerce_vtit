import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../redux/slices/cartSlice';


import useModal from '../hooks/useModal';
import LoginPhoneModal from '../components/modal/login/LoginPhoneModal';
import VerificationModal from '../components/modal/login/VerificationModal';
import LoginEmailModal from '../components/modal/login/LoginEmailModal';

import { CiLogin } from 'react-icons/ci';

const Cart = () => {
  const user = useSelector((state) => state.user?.user);
  const { modal, openModal, closeModal } = useModal();
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userId = user ? user._id : null;

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch, userId]);
  
  
  const handleNumberSuccess = () => {
    closeModal();
    openModal('verificationModal');
  };

  const handleEmailSuccess = () => {
    closeModal();
    navigate('/carts');
  };

  const handleVerificationSuccess = () => {
    closeModal();
    navigate('/carts');
  };

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
              onClick={() => openModal('numberModal')}
              className="bg-blue-500 w-28 p-2 text-white font-bold rounded-md mx-auto my-4"
              type="primary"
            >
              Đăng Nhập
            </button>
            <LoginPhoneModal
        isOpen={modal === 'numberModal'}
        onClose={closeModal}
        onSuccess={handleNumberSuccess}
        onOpenEmail={() => openModal('emailModal')}
      />

      <VerificationModal
        isOpen={modal === 'verificationModal'}
        onClose={closeModal}
        onSuccess={handleVerificationSuccess}
      />
      
      <LoginEmailModal
        isOpen={modal === 'emailModal'}
        onClose={closeModal}
        onSuccess={handleEmailSuccess}
      />
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
