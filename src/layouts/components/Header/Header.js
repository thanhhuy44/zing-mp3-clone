import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import Button from '~/components/Button';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input className={cx('search-input')} placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..." />
                <Button type="text" size="medium" to="/search" className={cx('search-btn')}>
                    <SearchIcon className={cx('search-icon')} />
                </Button>
            </div>
        </div>
    );
}

export default Header;
