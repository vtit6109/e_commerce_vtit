import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

const RenderDetailsProduct = ({ product }) => {
  if (
    !product.productDetails ||
    Object.keys(product.productDetails).length === 0
  ) {
    return <p>Không có thông tin chi tiết về sản phẩm này.</p>;
  }

  const productDetailsKeys = Object.keys(product.productDetails);

  return (
    <ul className="py-2">
      {productDetailsKeys.map((key, index) => (
        <li
          className={`${
            index === productDetailsKeys.length - 1 ? '' : 'border-b-[1px]'
          } py-2`}
          key={key}
        >
          <Row>
            <Col span={12}>{product.productDetails[key].title} </Col>
            <Col>
              {product.productDetails[key].values &&
              product.productDetails[key].values.length > 0
                ? product.productDetails[key].values.join(', ')
                : 'Không tìm thấy thông tin'}
            </Col>
          </Row>
        </li>
      ))}
    </ul>
  );
};
RenderDetailsProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default RenderDetailsProduct;
