import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Col, Row } from 'antd';

import ProductList from '../shared/ProductList';
import FilterBarComponet from '../components/FilterBar/FilterBar';

import { getCategoryProducts } from '../redux/slices/productsSlice';

const Categories = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const currentUrlc = useLocation().pathname.split('/')[1];
  const currentUrl = useLocation().pathname.split('/')[2];

  useEffect(() => {
    dispatch(
      getCategoryProducts({ catalog: currentUrlc, category: currentUrl }),
    );
  }, [dispatch, currentUrlc, currentUrl]);

  const allBrands = useMemo(
    () => new Set(products.map((product) => product.brand)),
    [products],
  );

  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    setSelectedBrands(Array.from(allBrands));
  }, [allBrands]);

  const handleBrandFilter = useCallback((list) => {
    setSelectedBrands(list);
  }, []);

  const filteredProducts = useMemo(
    () => products.filter((product) => selectedBrands.includes(product.brand)),
    [products, selectedBrands],
  );

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-slate-100 ">
      <Row className="">
        <Col className="w-[230px] px-1" span={4}>
          <FilterBarComponet
            data={products}
            onBrandFilter={handleBrandFilter}
          />
        </Col>
        <Col className="rounded-[10px] shadow-sm bg-white" span={20}>
          <ProductList itemsPerPage={6} data={filteredProducts} />
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
