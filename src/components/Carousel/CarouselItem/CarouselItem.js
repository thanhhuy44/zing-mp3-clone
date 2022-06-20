import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CarouselItem.modul.scss';

const cx = classNames.bind(styles);

function CarouselItem({ index, className, data }) {
    return (
        <Link key={data.encodeId} className={className} to={data.link}>
            <img src={data.banner} alt={data.encodeId} className={cx('carousel-img')} />
        </Link>
    );
}

export default CarouselItem;
