import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <Search />
        </div>
    );
}

export default Header;
