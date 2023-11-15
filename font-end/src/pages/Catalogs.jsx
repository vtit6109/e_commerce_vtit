import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Col, Row } from 'antd';

import FilterBarComponet from '../components/FilterBarComponet/FilterBarComponet';
import ProductListComponent from '../components/ProductListComponent';
import MenuComponent from '../components/MenuComponent';

import { getCatalogs } from '../redux/slices/catalogsSlice';
import { getCategories } from '../redux/slices/categoriesSlice';
import { getCatalogProducts } from '../redux/slices/productsSlice';
const Catalogs = () => {
  const dispatch = useDispatch();
  const currentUrl = useLocation().pathname.split('/')[1];

  const catalogs = useSelector((state) => state.catalogs);
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(getCatalogs());
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

if (!catalogs || !products) {
  return <div>Loading...</div>;
}

  return (
    <div className=" bg-slate-100 ">
      <Row className="">
        <Col className="w-[230px] px-4" span={4}>
          <MenuComponent
            title={'Danh Mục Sản Phẩm'}
            data={currentCategory}
            pathType={'category'}
          />
          <FilterBarComponet
            menu={currentCategory}
            data={products}
            onBrandFilter={handleBrandFilter}
          />
        </Col>
        <Col className="rounded-[10px] shadow-sm bg-white" span={20}>
          <ProductListComponent itemsPerPage={6} data={filteredProducts} />
        </Col>
      </Row>
    </div>
  );
};

export default Catalogs;
