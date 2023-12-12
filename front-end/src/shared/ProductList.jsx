import PropTypes from 'prop-types';
import { useState } from 'react';
import { Pagination, Skeleton, Empty } from 'antd';

import Card from './Card';

const ProductListComponent = ({ data, itemsPerPage, loading }) => {
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = itemsPerPage;
  // Calculate the current items to display
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  if(loading){
    return (
      <>
        <Skeleton/>
      </>
    )
  }

  return (
    <>
      {currentItems.length > 0 ? (
        <>
          <div className="grid justify-center gap-x-2 gap-y-5 grid-cols-6 m-4 p-4 border-[1px] border-solid rounded-[10px]">
            <Card productItems={currentItems} loading={loading} />
          </div>
          <div className="flex justify-center py-3">
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={data.length}
              pageSize={perPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : (
        <div className="flex w-full mt-3 justify-center items-center my-auto text-xl opacity-40">
          <Empty
            style={{ fontSize: '24px', opacity: '0.4', paddingRight: '6px' }}
          />
        </div>
      )}
    </>
  );
};
ProductListComponent.propTypes = {
  data: PropTypes.array,
  itemsPerPage: PropTypes.number,
  loading: PropTypes.bool,
};

export default ProductListComponent;
