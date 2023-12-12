import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

const SliderImgComponent = ({ data }) => {
  const [mainImage, setMainImage] = useState(data?.imgUrl[0]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollContainer = useRef(null);

  const checkScrollPosition = () => {
    if (!scrollContainer.current) return;
    setIsAtStart(scrollContainer.current.scrollLeft === 0);
    setIsAtEnd(
      scrollContainer.current.scrollLeft +
        scrollContainer.current.clientWidth ===
        scrollContainer.current.scrollWidth,
    );
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft +=
        direction * scrollContainer.current.offsetWidth;
      checkScrollPosition();
    }
  };

  return (
    <>
      <div className="bg-white px-8 py-4 rounded-xl shadow-sm">
        <img className="w-full mx-auto" src={mainImage} alt="" />
        {data?.imgUrl?.length > 0 && (
          <div className="relative">
            {!isAtStart && (
              <DoubleLeftOutlined
                className="absolute w-[28px] h-[28px] leading-[28px] bg-white rounded-full text-blue-500 shadow-lg top-1/2 left-0 justify-center transform -translate-y-1/2 "
                onClick={() => scroll(-1)}
              />
            )}
            <ul
              ref={scrollContainer}
              className="flex overflow-x-auto hideScrollbar user-select-none"
              onScroll={checkScrollPosition}
            >
              {data.imgUrl.map((img, index) => {
                return (
                  <li
                    key={index}
                    className={`flex-none p-2 w-[90px] ${
                      mainImage === img ? 'border-2 border-blue-500' : ''
                    }`}
                  >
                    <img src={img} onMouseOver={() => setMainImage(img)} />
                  </li>
                );
              })}
            </ul>
            {!isAtEnd && (
              <DoubleRightOutlined
                className="absolute w-[28px] h-[28px] leading-[28px] bg-white rounded-full text-blue-500 shadow-lg top-1/2 right-0 justify-center transform -translate-y-1/2"
                onClick={() => scroll(1)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

SliderImgComponent.propTypes = {
  data: PropTypes.shape({
    imgUrl: PropTypes.array,
  }),
};

export default SliderImgComponent;
