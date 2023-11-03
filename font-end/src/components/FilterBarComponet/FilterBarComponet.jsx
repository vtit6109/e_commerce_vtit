import PropTypes from 'prop-types';

import BrandCheckListComponent from './BrandCheckListComponent';

const FilterBarComponet = ({ data, onBrandFilter }) => {
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
  onBrandFilter: PropTypes.func,
};

export default FilterBarComponet;
