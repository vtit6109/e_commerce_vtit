import { Link } from 'react-router-dom';
import { Result } from 'antd';

function PageNotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang này không tồn tại!."
      extra={
        <button className=" primary__btn">
          <Link to="/">Trở về trang chủ</Link>
        </button>
      }
    />
  );
}

export default PageNotFound;
