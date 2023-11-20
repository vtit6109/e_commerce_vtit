import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Col, Row, Alert } from 'antd';

import ProductList from '../shared/ProductList';
import FilterBarComponet from '../components/FilterBar/FilterBar';
import Menu from '../shared/Menu';

import { getCategories } from '../redux/slices/categoriesSlice';
import { getCatalogProducts } from '../redux/slices/productsSlice';
const Catalogs = () => {
  const dispatch = useDispatch();
  const currentUrl = useLocation().pathname.split('/')[1];

  const categories = useSelector((state) => state.categories.data);
  const products = useSelector((state) => state.products.data);

  const loading = useSelector((state) => state.products.loading || state.catalogs.loading || state.categories.loading)
  const error = useSelector((state) => state.products.error || state.catalogs.error || state.categories.error)

  useEffect(() => {

    dispatch(getCategories());
    dispatch(getCatalogProducts(currentUrl));
  }, [dispatch, currentUrl]);

  const currentCategory = useMemo(
    () => categories.filter((category) => category.catalog?.url === currentUrl),
    [currentUrl, categories],
  );

  const allBrands = useMemo(
    () => [...new Set(products.map((product) => product.brand))],
    [products],
  );

  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    setSelectedBrands(allBrands);
  }, [allBrands]);

  const handleBrandFilter = useCallback((list) => {
    setSelectedBrands(list);
  }, []);

  const filteredProducts = useMemo(
    () => products.filter((product) => selectedBrands.includes(product.brand)),
    [products, selectedBrands],
  );

  if (error){
    return (
    <>
      <Alert
        message="Error"
        description="Đã có lỗi khi tải dữ liệu."
        type="error"
        showIcon
    />
    </>
    )
  }

  return (
    <div className=" bg-slate-100 ">
      <Row className="">
        <Col className="w-[230px] px-4" span={4}>
          <Menu
            title={'Danh Mục Sản Phẩm'}
            data={currentCategory}
            pathType={'category'}
            loading={loading}
          />
          <FilterBarComponet
            menu={currentCategory}
            data={products}
            onBrandFilter={handleBrandFilter}
            loading={loading}
          />
        </Col>
        <Col className="rounded-[10px] shadow-sm bg-white" span={20}>
          <ProductList itemsPerPage={6} data={filteredProducts} loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default Catalogs;
