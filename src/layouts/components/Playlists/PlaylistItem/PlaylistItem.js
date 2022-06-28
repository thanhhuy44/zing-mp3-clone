import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../Playlists.module.scss';

const cx = classNames.bind(styles);

function PlaylistItem({ playlist }) {
    return (
        <div key={playlist.encodeId} className={cx('item')}>
            <div className={cx('playlist-thumb')}>
                <div className={cx('playlist-action')}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                </div>
                <img src={playlist.thumbnailM} alt={playlist.sortDescription} className={cx('playlist-img')} />
            </div>
            <div className={cx('info')}>
                <Link to={playlist.link} state={{ id: playlist.encodeId }}>
                    <h3 className={cx('name')}>{playlist.title}</h3>
                </Link>
                <p className={cx('desc')}>{playlist.sortDescription}</p>
            </div>
        </div>
    );
}

export default PlaylistItem;
