import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';
import { Checkbox, Divider, Rate } from 'antd';

const RatingCheckListComponent = ({ data, onFilter }) => {
  const ratings = useMemo(
    () => [...new Set(data.map((item) => item.rating))],
    [data],
  );
  const [checkedList, setCheckedList] = useState(ratings);
  const checkAll = ratings.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < ratings.length;

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
      updateCheckedList(e.target.checked ? ratings : []);
    },
    [ratings, updateCheckedList],
  );

  const options = ratings.map((star) => ({
    label: (
      <div className="flex gap-1 items-center text-xs">
        <Rate disabled defaultValue={star} style={{ fontSize: '12px' }} />
        <span>Từ</span>
        <span>{star}</span>
        <span>Sao</span>
      </div>
    ),
    value: star,
  }));

  return (
    <>
      <h2 className="">Đánh Giá</h2>
      <div className="flex flex-col text-center mt-4">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Tất Cả
        </Checkbox>
        <Divider className="my-2" />
        <Checkbox.Group
          options={options}
          value={checkedList}
          onChange={onChange}
        />
      </div>
    </>
  );
};

RatingCheckListComponent.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
};

export default RatingCheckListComponent;
