import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../redux/slices/cartSlice';

// import { Checkbox } from 'antd';
import { Table } from 'antd';

import useModal from '../../hooks/useModal';
import LoginModal from '../../components/modal/login/LoginModal'

import { CiLogin } from 'react-icons/ci';


const Cart = () => {
  const dispatch = useDispatch();
  const { modal, openModal, closeModal } = useModal();
  
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
              onClick={() => openModal('numberModal')}
              className="bg-blue-500 w-28 p-2 text-white font-bold rounded-md mx-auto my-4"
              type="primary"
            >
              Đăng Nhập
            </button>
            <LoginModal modal={modal} openModal={openModal}  closeModal={closeModal} path={'/carts'} />
          </div>
        </div>
      </>
    );
  }
  if (!cart) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: 'Sản Phẩm',
      dataIndex: 'product',
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'price',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'qty',
    },
    {
        title: 'Thành Tiền',
        dataIndex: 'amount',
      },
  ];
  const data = 
  cart && cart.products && cart.products.map((item, index)=>({
      key : index ,
      product: item.productId.productName,
      price: item.productId.productPrice,
      qty: item.quantity,
      amount: item.productId.productPrice * item.quantity
  }))

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };  
  return (
    <>
      <div>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      
    </>
  );
};

export default Cart;
