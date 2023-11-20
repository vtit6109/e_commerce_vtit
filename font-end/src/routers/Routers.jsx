import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts } from '../redux/slices/productsSlice';

import App from '../App';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Catalogs from '../pages/Catalogs';
import Categories from '../pages/Categories';
import ProductDetail from '../pages/ProductDetail';
import AccountsDetail from '../pages/AccountDetail';
import Address from '../components/AccountDetail/Address';
import EditAccount from '../components/AccountDetail/EditAccount';
import Order from '../components/AccountDetail/Order';
import Review from '../components/AccountDetail/Review';
import Wishlist from '../components/AccountDetail/Wishlist';
import Carts from '../pages/Carts';

const Loading = () => <div>Loading...</div>;

const Routers = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const [router, setRouter] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const catalogRoutes = products.flatMap((product) => ({
      path: `/${product.category.catalog.url}`,
      element: <Catalogs />,
    }));

    const categoryRoutes = products.flatMap((product) => ({
      path: `/${product.category.catalog.url}/${product.category.url}`,
      element: <Categories />,
    }));

    const productRoutes = products.flatMap((product) => ({
      path: `/${product.category.catalog.url}/${product.category.url}/:productId`,
      element: <ProductDetail />,
    }));

    const newRouter = createBrowserRouter([
      {
        path: '',
        element: <App />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          ...catalogRoutes,
          ...categoryRoutes,
          ...productRoutes,
          {
            path: '/customer/*',
            element: <AccountsDetail />,
            children: [
              {
                path: 'edit',
                element: <EditAccount />,
              },
              {
                path: 'order',
                element: <Order />,
              },
              {
                path: 'address',
                element: <Address />,
              },
              {
                path: 'wishlist',
                element: <Wishlist />,
              },
              {
                path: 'review',
                element: <Review />,
              },
            ],
          },
          {
            path: '/carts',
            element: <Carts />,
          },
          {
            path: '*',
            element: products.length > 0 ? <PageNotFound /> : <Loading />,
          },
        ],
      },
    ]);
    setRouter(newRouter);
  }, [products]);

  return router ? <RouterProvider router={router} /> : null;
};

export default Routers;
