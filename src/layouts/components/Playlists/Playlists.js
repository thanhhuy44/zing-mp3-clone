import classNames from 'classnames/bind';
import styles from './Playlists.module.scss';
import PlaylistItem from './PlaylistItem';

const cx = classNames.bind(styles);

function Playlists({ data }) {
    const playlists = data.items;

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>{data.title}</h1>
            <div className={cx('wrapper')}>
                <div className={cx('list')}>
                    {playlists.map((playlist) => (
                        <PlaylistItem key={playlist.encodeId} playlist={playlist} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Playlists;
