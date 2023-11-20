import PropTypes from 'prop-types';
import BrandCheckListComponent from './BrandCheckList';
import {Skeleton} from 'antd';

const FilterBarComponet = ({ data, loading, onBrandFilter }) => {

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
      <ul className="my-4">
        <li className="bg-white text-lg rounded-[10px] text-left px-4 py-2 ">
          <BrandCheckListComponent data={data} onFilter={onBrandFilter} />
        </li>
      </ul>
    </>
  );
};

FilterBarComponet.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onBrandFilter: PropTypes.func,
};

export default FilterBarComponet;
