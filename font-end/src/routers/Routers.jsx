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
import AccountsDetail from '../pages/Account/AccountsDetail';
import Address from '../pages/Account/Address';
import EditAccount from '../pages/Account/EditAccount';
import Order from '../pages/Account/Order';
import Review from '../pages/Account/Review';
import Wishlist from '../pages/Account/Wishlist';
import Cart from '../pages/Cart/Cart';
import Test from '../test'
const Loading = () => <div>Loading...</div>; // Trạng thái tải

const Routers = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
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
            element: <Cart />,
          },
          {
            path: '/test',
            element: <Test />,
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
