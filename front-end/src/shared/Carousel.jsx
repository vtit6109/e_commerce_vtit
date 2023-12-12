import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { Image } from 'antd';

const SliderComponent = ({ arrImages }) => {
  return (
    <Carousel autoplay>
      {arrImages.map((img, index) => {
        return (
          <div key={index}>
            <h3 className="w-full text-center">
              <Image src={img} alt="slider" />
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
};

SliderComponent.propTypes = {
  arrImages: PropTypes.array,
};
export default SliderComponent;
