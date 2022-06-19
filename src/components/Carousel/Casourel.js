import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';

import CarouselItem from './CarouselItem';
import { NextButton, PrevButton } from '~/components/Button/SlideButton';

const cx = classNames.bind(styles);

function Carousel({ data }) {
    console.log(data.items);
    const sliderItems = data.items;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        swipeToSlide: true,
        styles: {
            backgroundColor: 'transparent',
        },
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className={cx('container')}>
            <Slider {...settings} className={cx('casourel-list')}>
                {sliderItems.map((sliderItem, index) => (
                    <CarouselItem
                        key={sliderItem.encodeId}
                        index={index + 1}
                        data={sliderItem}
                        className={cx('carousel-item')}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;
