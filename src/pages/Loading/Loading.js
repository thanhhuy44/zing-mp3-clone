import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <h2>Loading</h2>
                <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} />
            </div>
        </div>
    );
}

export default Loading;
