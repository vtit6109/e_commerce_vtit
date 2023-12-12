import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
} from '../../redux/slices/cartSlice';
import { Table, Skeleton } from 'antd';

import {FaCheckCircle} from 'react-icons/fa'
import {  CiTrash } from 'react-icons/ci';

const CartsList = ( { userId, cartData, loading } ) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = async (productId) => {
        await dispatch(removeFromCart({ userId, productId }));
      };
    
      const handleUpdateQuantity = async (productId, quantity) => {
        await dispatch(updateQuantity({ userId, productId, quantity }));
      };
    
  const columns = [
    { 
      title: 'Sản Phẩm', 
      dataIndex: 'product',
      render : (text, record) => (
        <div className='flex items-center'>
          <img
            className='w-20 h-20'
            src={record.imgUrl} alt="" 
          />
          <div className='flex flex-col ml-2'>
            {record.active === true && (
              <div className='flex items-center w-max text-xs text-blue-600 bg-blue-100 px-1 rounded-md'>
                <FaCheckCircle/>
                <span className='ml-1'>Chính Hãng</span>
              </div>
            )}
            <Link to={record.url}>{record.product}</Link>
            <span className='text-xs'>Thời gian giao (dự kiến): Ngày mai</span>
          </div>
        </div>
      )
    },
    { 
      title: 'Đơn Giá', 
      dataIndex: 'price', 
      align: 'center',
      render: (text) => (
        <div className='font-semibold'>
          <span className='mr-1'>{text?.toLocaleString('vn')}</span>
          <span>vnđ</span>
        </div>
      )
    },
    {
      title: 'Số Lượng',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
      render: (text, record) => (
        <div className="flex justify-center">
          <button
            className="px-2 border-[1px] rounded-s-md "
            onClick={() => handleUpdateQuantity(record.key, text - 1)}
            disabled={text <= 1}
          >
            -
          </button>
          <input
            className="w-10 px[2px] border-y-[1px] text-center"
            type="number"
            value={text}
            onChange={(e) => handleUpdateQuantity(record.key, e.target.value)}
          />
          <button
            className="px-2 border-[1px]  rounded-e-md"
            onClick={() => handleUpdateQuantity(record.key, text + 1)}
          >
            +
          </button>
        </div>
      ),
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (text) => (
        <div className='text-red-500 font-semibold'>
          <span className='mr-1'>{text?.toLocaleString('vn')}</span>
          <span>vnđ</span>
        </div>
      )
    },
    {
      title: 'Xóa sản phẩm',
      dataIndex: 'key',
      key: 'delete',
      align: 'center',
      render: (text, record) => (
        <div
          className="flex justify-center text-blue-500 hover:opacity-50 px-2"
          onClick={() => handleRemoveFromCart(record.key)}
        >
          <CiTrash className="text-xl" />
        </div>
      ),
    },
  ];

  const data =
    cartData &&
    cartData.products &&
    cartData.products.map((item) => ({
      product: item.productId.productName,
      active: item.productId.active,
      url: `/${item.productId?.category?.catalog?.url}/${item.productId?.category?.url}/${item.productId?._id}`,
      imgUrl: item?.productId?.imgUrl?.[0],
      price: item.productId.productPrice,
      qty: item.quantity,
      amount: item.productId.productPrice * item.quantity,
      key: item.productId._id,
    }));

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      selectedRowKeys.forEach((key) => {
        console.log(`Product ID: ${key}`);
      });
    },
  };

  if(loading){
    return (
      <>
         <div>
          <Skeleton active />
        </div>
      </>
    )
  }

  return (
    <>
     <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  )


}
CartsList.propTypes = {
    userId: PropTypes.string.isRequired,
    cartData: PropTypes.object,
    loading: PropTypes.bool
  };
  
export default CartsList