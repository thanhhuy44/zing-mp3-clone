import Header from '~/layouts/components/Header';
import LeftSidebar from '~/layouts/components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Player from '../components/Player';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    const currentSong = useSelector((state) => state.audio.infoSongPlayer);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <LeftSidebar />
                </div>
                <div className={cx('content')}>
                    <Header />
                    <div className={cx('page')}>{children}</div>
                </div>
                <div className={cx('right-content')}>
                    <RightSidebar />
                </div>
            </div>
            {currentSong !== {} && <Player />}
        </div>
    );
}

export default MainLayout;
