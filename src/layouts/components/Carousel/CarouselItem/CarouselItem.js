import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CarouselItem.modul.scss';

const cx = classNames.bind(styles);

function CarouselItem({ className, data }) {
    return data.type === 4 ? (
        <Link key={data.encodeId} className={className} to={data.link} state={{ id: data.encodeId }}>
            <img src={data.banner} alt={data.encodeId} className={cx('carousel-img')} />
        </Link>
    ) : (
        <div key={data.encodeId} className={className}>
            <img src={data.banner} alt={data.encodeId} className={cx('carousel-img')} />
        </div>
    );
}

export default CarouselItem;
