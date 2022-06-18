import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './SearchResultItem.module.scss';

const cx = classNames.bind(styles);

function SearchResultItem() {
    return (
        <div className={cx('container')}>
            <img
                src="https://i.pinimg.com/564x/50/96/c7/5096c7dde602d7e1a761ed6f9b87e85d.jpg"
                alt="thanhhuy"
                className={cx('avatar')}
            />
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={faPlayCircle} />
            </div>
            <div className={cx('info')}>
                <h4 className={cx('name')}>ai Muon Nghe Khong</h4>
                <span className={cx('desc')}>Den</span>
            </div>
        </div>
    );
}

export default SearchResultItem;
