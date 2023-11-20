import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Spin, Alert } from 'antd';

import { RiseOutlined, CheckOutlined, LikeOutlined, LoadingOutlined  } from '@ant-design/icons';

import { getCatalogs } from '../redux/slices/catalogsSlice';
import { getAllProducts } from '../redux/slices/productsSlice';

import Menu from '../shared/Menu';
import Carousel from '../shared/Carousel';
import ProductCarousel from '../components/ProductDisplay/ProductCarousel';
import ProductShowMoreLess from '../components/ProductDisplay/ProductShowMoreLess';

import slider01 from '../assets/image/slider/slider01.png';
import slider02 from '../assets/image/slider/slider02.png';
import slider03 from '../assets/image/slider/slider03.png';

const arrImages = [slider01, slider02, slider03];

function Home() {
  const dispatch = useDispatch();
  const catalogs = useSelector((state) => state.catalogs.data);
  const products = useSelector((state) => state.products.data);

  const loading = useSelector((state) => state.catalogs.loading || state.products.loading);
  const error = useSelector((state) => state.catalogs.error || state.products.error);

  useEffect(() => {
    dispatch(getCatalogs());
    dispatch(getAllProducts());
  }, [dispatch]);

  const bestSellerSorted = [...products].sort((a, b) => b.sold - a.sold);

  const favoritesSorted = [...products]
    .filter((product) => product.favoriteStar > 3)
    .sort((a, b) => b.favoriteStar - a.favoriteStar)
    .slice(0, 9);

  const activeSorted = [...products]
    .filter((product) => product.active === true)
    .slice(0, 9);


    if (loading) {
      return (
        <>
            <div className=''>
              <Spin
              indicator={
                <LoadingOutlined
                  style={{fontSize: 24,}}
                    spin
                  />
                }
              />
            </div>
        </>
      )
    }
    if (error) {
      return (
        <>
          <div className='flex justify-center items-center'> 
            <Alert
              message="Có lỗi xảy ra khi tải dữ liệu"
              type="error"
            />
          </div>
        </>
      );
    }

  return (
    <>
      <Row className="">
        <Col className="w-[230px] px-4" span={4}>
          <div className="">
            <Menu title={'Danh Mục'} data={catalogs} pathType={'catalog'} />
          </div>
        </Col>
        <Col className="" span={20}>
          <div className=" bg-white mb-4 p-4 rounded-lg shadow-md">
            <Carousel arrImages={arrImages} />
          </div>
          <ul>
            <li className="bg-white my-4 p-4 rounded-lg shadow-md">
              <div className="flex pl-4 text-lg items-center font-bold mb-2">
                <span className="flex mr-2">
                  <RiseOutlined style={{ fontSize: '20px' }} />
                </span>
                Sản Phẩm Bán Chạy
              </div>
              <ProductShowMoreLess data={bestSellerSorted} />
            </li>

            <li className="bg-white my-4 p-4 rounded-lg shadow-md">
              <div className="flex pl-4 text-lg items-center font-bold mb-2">
                <span className="flex mr-2">
                  <LikeOutlined style={{ fontSize: '20px' }} />
                </span>
                Đánh Giá Tốt Nhất
              </div>
              <ProductCarousel data={favoritesSorted} />
            </li>

            <li className="bg-white my-4 p-4 rounded-lg shadow-md">
              <div className="flex pl-4 text-lg items-center font-bold mb-2">
                <span className="flex mr-2">
                  <CheckOutlined style={{ fontSize: '20px' }} />
                </span>
                Được Xác Nhận
              </div>
              <ProductCarousel data={activeSorted} />
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
}

export default Home;
