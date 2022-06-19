import classNames from 'classnames/bind';
import styles from './CarouselItem.modul.scss';

const cx = classNames.bind(styles);

function CarouselItem({ index, className, data }) {
    return (
        <div key={data.encodeId} className={className}>
            <img src={data.banner} alt={data.encodeId} className={cx('carousel-img')} />
        </div>
    );
}

export default CarouselItem;
