import { Col, Row } from 'antd';

import momoIcon from '../../assets/icon/payMethodIcon/momo.png';
import vtMoney from '../../assets/icon/payMethodIcon/vtmoney.png';
import zalopay from '../../assets/icon/payMethodIcon/zalopay.png';
import visa from '../../assets/icon/payMethodIcon/visa.png';
import mastercard from '../../assets/icon/payMethodIcon/mastercard.png';
import paypal from '../../assets/icon/payMethodIcon/paypal.jpg';

import facebook from '../../assets/icon/payMethodIcon/facebook.png';
import zalo from '../../assets/icon/payMethodIcon/zalo.png';
import youtobe from '../../assets/icon/payMethodIcon/youtobe.png';

const FooterComponent = () => {
  return (
    <footer>
      <Row className=" ">
        <Col span={6} className="flex items-center justify-center px-2">
          <div className="flex flex-col items-center">
            <div className="flex flex-col justify-center items-center p-2 ">
              <span className="font-titan-one font-extrabold text-3xl">
                ECOMMERCE
              </span>
              <span className="italic text-sm underline">
                Copy design & documents of{' '}
                <a className="text-blue-500" href="https://tiki.vn/">
                  Tiki.vn
                </a>
              </span>
            </div>
            <p className="italic px-4 text-justify mt-2 ">
              Để cung cấp trải nghiệm tốt nhất, tôi tham khảo thiết kế, chức
              năng, và sử dụng tài liệu từ{' '}
              <a className="text-blue-500" href="https://tiki.vn/">
                Tiki.vn
              </a>
              , sản phẩm chỉ mang tính chất minh họa không phải là sản phẩm kinh
              doanh.
            </p>
            <p className="px-4 text-justify mt-2 font-bold">
              Made by{' '}
              <a
                className="text-blue-500 font-medium underline"
                title="Github"
                href="https://github.com/vtit6109"
              >
                VuThangIT
              </a>
            </p>
          </div>
        </Col>

        <Col span={5} className="px-2">
          <h2 className="font-bold text-base">Hỗ trợ Khách hàng</h2>
          <ul className="text-xs cursor-pointer italic">
            <li className="mt-2 hover:underline">Holine: 1900.696.696</li>
            <li className="mt-2 hover:underline">Các câu hỏi thường gặp</li>
            <li className="mt-2 hover:underline">Gửi yêu cầu hỗ trợ</li>
            <li className="mt-2 hover:underline">Hướng dẫn đặt hàng</li>
            <li className="mt-2 hover:underline">Phương thức vận chuyển</li>
            <li className="mt-2 hover:underline">chính sách đổi trả</li>
            <li className="mt-2 hover:underline">
              Hỗ trợ khách hàng: ecommerce@vtit.com
            </li>
            <li className="mt-2 hover:underline">
              Báo lỗi bảo mật: security@vtit.com
            </li>
          </ul>
        </Col>
        <Col span={4} className="px-2">
          <h2 className="font-bold text-base">Về ECOMMERCEbyVTIT</h2>
          <ul className="text-xs cursor-pointer italic">
            <li className="mt-2 hover:underline">
              Giới thiệu về ECOMMERCEbyVTIT
            </li>
            <li className="mt-2 hover:underline">Demo Blog</li>
            <li className="mt-2 hover:underline">Chính sách bảo mật</li>
            <li className="mt-2 hover:underline">Chính sách thanh toán</li>
            <li className="mt-2 hover:underline">Điều khoản sử dụng</li>
            <li className="mt-2 hover:underline">Nâng cấp khách hàng VIP</li>
            <li className="mt-2 hover:underline">Tiếp thị liên kết</li>
          </ul>
        </Col>
        <Col span={4} className="px-2">
          <h2 className="font-bold text-base">Hợp tác và liên kết</h2>
          <ul className="text-xs cursor-pointer italic">
            <li className="mt-2 hover:underline">
              Quy chế hoạt động Sàn GDTMĐT
            </li>
            <li className="mt-2 hover:underline">
              Bán hàng cùng ECOMMERCEbyVTIT
            </li>
          </ul>
        </Col>
        <Col span={4} className="px-2">
          <div>
            <h2 className="font-bold text-base">Phương thức thanh toán</h2>
            <div className="text-xs cursor-pointer">
              <div className="my-2 grid grid-cols-3 gap-y-3 items-center">
                <div className="w-[32px] ">
                  <img className="w-full" src={visa} alt="" />
                </div>
                <div className="w-[32px] ">
                  <img className="w-full" src={mastercard} alt="" />
                </div>
                <div className="w-[32px] ">
                  <img className="w-full" src={paypal} alt="" />
                </div>
                <div className="w-[32px] ">
                  <img className="w-full" src={momoIcon} alt="" />
                </div>
                <div className="w-[48px] ">
                  <img className="w-full" src={vtMoney} alt="" />
                </div>
                <div className="w-[32px] ">
                  <img className="w-full" src={zalopay} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-base">Kết nối với chúng tôi</h2>
            <div className="text-xs cursor-pointer">
              <div className="my-2 grid grid-cols-3 gap-y-3 items-center">
                <div className="w-[32px]">
                  <img className="w-full" src={facebook} alt="" />
                </div>
                <div className="w-[32px]">
                  <img className="w-full" src={zalo} alt="" />
                </div>
                <div className="w-[32px]">
                  <img className="w-full" src={youtobe} alt="" />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default FooterComponent;
