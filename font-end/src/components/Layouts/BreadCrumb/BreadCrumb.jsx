import { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';

const BreadcrumbComponent = () => {
  const { pathname: currentPath } = useLocation();
  const categories = useSelector((state) => state.categories);

  const breadcrumbItems = useMemo(() => {
    if (currentPath === '/') return null;

    const pathParts = currentPath.split('/').filter(Boolean);
    let path = '';

    const breadcrumbItems = pathParts.reduce(
      (acc, part) => {
        path += `/${part}`;
        let item;
        const found = categories.some((category) => {
          if (category.url === part) {
            item = category;
            return true;
          }
          if (category.catalog && category.catalog.url === part) {
            item = category.catalog;
            return true;
          }
          return false;
        });

        if (found) {
          acc.push({ path, title: item.name });
        } else if (part === 'carts') {
          acc.push({ path, title: 'Giỏ hàng' });
        } else if (part === 'customer') {
          acc.push({ path, title: 'Tài Khoản' });
        } else if (path.startsWith('/customer')) {
          const titles = {
            edit: 'Chỉnh sửa thông tin tài khoản',
            order: 'Quản lý đơn hàng',
            address: 'Địa chỉ giao hàng',
            wishlist: 'Danh sách sản phẩm yêu thích',
            review: 'Đánh giá của bạn',
            'danh-rieng-cho-ban': 'Dành Riêng Cho Bạn',
          };
          acc.push({ path, title: titles[part] });
        }
        return acc;
      },
      [{ path: '/', title: 'Home' }],
    );
    return breadcrumbItems;
  }, [currentPath, categories]);

  if (!breadcrumbItems) return null;

  return (
    <Breadcrumb
      separator="/"
      itemRender={(item, route, params, items) => {
        const last = items.indexOf(item) === items.length - 1;
        const isHome = item.path === '/';
        return last ? (
          <span>{item.title}</span>
        ) : (
          <Link to={item.path}>
            {isHome ? (
              <div className="flex items-center">
                <HomeOutlined
                  className="flex text-[16px] mb-1 mr-1"
                  style={{ fontSize: '16px' }}
                />
                <span className="flex">{item.title}</span>
              </div>
            ) : (
              <div>{item.title}</div>
            )}
          </Link>
        );
      }}
      items={breadcrumbItems}
      style={{ fontSize: '16px' }}
    />
  );
};

export default BreadcrumbComponent;
