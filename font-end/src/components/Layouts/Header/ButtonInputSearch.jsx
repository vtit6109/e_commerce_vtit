import { Input, Button } from 'antd';
import { SearchOutlined,  } from '@ant-design/icons';


const ButtonInputSearch = () => {
    return (
      <div className="flex items-center border-[1px] border-gray-300 rounded-lg  bg-white">
        <span className=" opacity-75 text-[18px] mx-4">
          <SearchOutlined />
        </span>
        <Input
          bordered={false}
          style={{ backgroundColor: '#ffff', borderRadius: '0px' }}
          placeholder="Bạn tìm gì ..."
          size="large"
          allowClear
        />
        <span className="border-[1px] border-gray-300 h-[30px]"></span>
        <Button
          className="hover:text-blue-500"
          style={{
            display: 'flex',
            borderRadius: '0px 8px 8px 0px',
            border: 'none',
            alignItems: 'center',
            background: '#ffff',
            fontWeight: '600',
            color: '#9C9C9C',
          }}
          size={'large'}
        >
          Tìm kiếm
        </Button>
      </div>
    );
  };
  export default ButtonInputSearch