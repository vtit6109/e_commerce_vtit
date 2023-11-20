import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { Skeleton } from 'antd';

const getData = (data, pathType) => {
  if (pathType === 'catalog') {
    return data.map((item) => ({
      label: (
        <Link to={`${item.url}`} className="flex items-center">
          <img className="w-8 h-8 mr-2" src={item.img} />
          <div className="whitespace-normal text-sm">{item.name}</div>
        </Link>
      ),
    }));
  } else if (pathType === 'category') {
    return data.map((item) => ({
      label: <Link to={`/${item.catalog.url}/${item.url}`}>{item.name}</Link>,
    }));
  }
};

const MenubarComponent = ({ data, title, pathType, loading }) => {
  const processData = getData(data, pathType);
  
  if(loading){
    return (
      <>
         <div>
          <Skeleton active />
        </div>
      </>
    )
  }
  return (
    <>
      <div className="bg-white text-lg text-left rounded-lg shadow-md">
        <h2 className="font-bold px-4 py-2">{title}</h2>
        <div>
          <Menu
            items={processData}
            style={{ borderRadius: '0px 0px 8px 8px' }}
          />
        </div>
      </div>
    </>
  );
};
MenubarComponent.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  pathType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MenubarComponent;
