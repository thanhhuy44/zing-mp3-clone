import Header from '~/layouts/components/Header';
import LeftSidebar from '~/layouts/components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Player from '../components/Player';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <LeftSidebar />
                </div>
                <div className={cx('content')}>
                    <Header />
                    {children}
                </div>
                <div className={cx('right-content')}>
                    <RightSidebar />
                </div>
            </div>
            <Player />
        </div>
    );
}

export default MainLayout;
