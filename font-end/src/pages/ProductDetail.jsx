import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Row } from 'antd';
import { Empty, Rate } from 'antd';

import { getAllProducts } from '../redux/slices/productsSlice';

import SliderImgComponent from '../components/DetailProductComponents/SliderImgComponent';
import RenderDetailsProduct from '../components/DetailProductComponents/RenderDetailsProduct';
import AddToCartComponent from '../components/DetailProductComponents/AddToCartComponent';

import { TbHeartPlus } from 'react-icons/tb'

const ProductDetail = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user?.user);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const product = products.find(
    (product) => String(product._id) === String(productId),
  );

  if (!product) {
    return (
      <div>
        <Empty description={'Sản Phẩm Không Tồn Tại'} />
      </div>
    );
  }
  return (
    <Row className="flex justify-center px-4">
      <Col span={8} className="flex flex-col w-[400px] px-4">
        <SliderImgComponent data={product} />
      </Col>
      <Col span={8} className="flex flex-col w-[400px] px-4">
        <ul>
          <li className="relative bg-white p-4 rounded-xl shadow-sm mb-2">
            <div title='Thêm vào danh sách yêu thích' className='absolute top-0 right-0 cursor-pointer'>
              <TbHeartPlus className='text-2xl m-3'/>
            </div>
            <div className='pb-2'>
              Thương Hiệu : <a className="text-blue-600">{product.brand}</a>
            </div>
            <div className="text-xl font-semibold">{product.productName}</div>
            <div className="flex items-center">
              <div className="text-sm pr-2">
                <Rate
                  style={{ fontSize: '14px' }}
                  disabled
                  defaultValue={product.favoriteStar}
                />
              </div>
              <div className="border-l pl-2">Đã bán {product.sold}</div>
            </div>
            <div className="text-2xl font-semibold">
              {product.productPrice.toLocaleString('vn')}{' '}
              <span className="underline text-[65%] my-auto">đ</span>
            </div>
            <div>Màu: {product.color}</div>
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm mb-2">
            <div className="text-base font-semibold">Thông tin chi tiết</div>
            <RenderDetailsProduct product={product} />
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm mb-2">
            <div className="text-base font-semibold">Mô tả sản phẩm</div>
            <div>{product.productDescription}</div>
          </li>
        </ul>
      </Col>
      <Col span={8} className="flex flex-col w-[400px] px-4">
        <AddToCartComponent
          productId={productId}
          user = {!user ? '' : user}
          price={product.productPrice}
        />
      </Col>
    </Row>
  );
};

export default ProductDetail;
