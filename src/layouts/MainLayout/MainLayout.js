import Header from '~/layouts/components/Header';
import LeftSidebar from '~/layouts/components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Player from '../components/Player';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div>
            <div className={cx('container')}>
                <LeftSidebar />
                <div className={cx('content')}>
                    <Header />
                    {children}
                </div>
                <RightSidebar />
            </div>
            <Player />
        </div>
    );
}

export default MainLayout;
