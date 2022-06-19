import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './SearchResultItem.module.scss';

const cx = classNames.bind(styles);

function SearchResultItem({ data }) {
    return (
        <div className={cx('container')}>
            <img src={data.thumbnailM} alt={data.title} className={cx('avatar')} />
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={faPlayCircle} />
            </div>
            <div className={cx('info')}>
                <h4 className={cx('name')}>{data.title}</h4>
                <span className={cx('desc')}>{data.artistsNames}</span>
            </div>
        </div>
    );
}

export default SearchResultItem;
