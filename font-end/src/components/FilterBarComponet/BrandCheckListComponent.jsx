import PropTypes from 'prop-types';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Checkbox, Divider } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

const BrandCheckListComponent = ({ data, onFilter }) => {
  const brands = useMemo(() => {
    const allBrands = data.map((item) => item.brand);
    return [...new Set(allBrands.filter(Boolean))]; // Loại bỏ các giá trị rỗng
  }, [data]);
  const [checkedList, setCheckedList] = useState([]);

  useEffect(() => {
    setCheckedList(brands);
  }, [brands]);

  const checkAll = brands.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < brands.length;

  const updateCheckedList = useCallback(
    (list) => {
      setCheckedList(list);
      onFilter(list);
    },
    [onFilter],
  );

  const onChange = updateCheckedList;

  const onCheckAllChange = useCallback(
    (e) => {
      updateCheckedList(e.target.checked ? brands : []);
    },
    [brands, updateCheckedList],
  );

  const onUncheckAllChange = useCallback(() => {
    updateCheckedList([]);
  }, [updateCheckedList]);

  return (
    <>
      <h2 className="font-bold ">Hãng Sản Xuất</h2>
      <div className="text-center mt-4 cursor-pointer gap-2">
        <Checkbox.Group
          options={brands}
          value={checkedList}
          onChange={onChange}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        />
        <Divider className="my-2" />
        <div className="text-sm text-left flex flex-col gap-2">
          <div>
            <Checkbox
              className="hover:underline"
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              <span className="text-blue-400">Chọn Tất Cả</span>
            </Checkbox>
          </div>
          <div
            className="hover:underline flex gap-2"
            onClick={onUncheckAllChange}
          >
            <CloseOutlined />
            <span className="text-red-400">Hủy Chọn Tất Cả</span>
          </div>
        </div>
      </div>
    </>
  );
};

BrandCheckListComponent.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
};

export default BrandCheckListComponent;
