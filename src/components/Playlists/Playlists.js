import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Playlists.module.scss';

const cx = classNames.bind(styles);

function Playlists({ data }) {
    const todaySuggestPlaylists = data.items;
    console.log(todaySuggestPlaylists);

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>{data.title}</h1>
            <div className={cx('list')}>
                {todaySuggestPlaylists.map((todaySuggestPlaylist) => (
                    <div key={todaySuggestPlaylist.encodeId} className={cx('item')}>
                        <div className={cx('playlist-thumb')}>
                            <div className={cx('playlist-action')}>
                                <FontAwesomeIcon icon={faCirclePlay} />
                            </div>
                            <img
                                src={todaySuggestPlaylist.thumbnail}
                                alt={todaySuggestPlaylist.sortDescription}
                                className={cx('playlist-img')}
                            />
                        </div>
                        <div className={cx('info')}>
                            <Link to={todaySuggestPlaylist.link}>
                                <h3 className={cx('name')}>{todaySuggestPlaylist.title}</h3>
                            </Link>
                            <p className={cx('desc')}>{todaySuggestPlaylist.sortDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playlists;
