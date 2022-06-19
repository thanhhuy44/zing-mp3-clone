import classNames from 'classnames/bind';
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
                            <img
                                src={todaySuggestPlaylist.thumbnail}
                                alt={todaySuggestPlaylist.sortDescription}
                                className={cx('playlist-img')}
                            />
                        </div>
                        <div className={cx('info')}>
                            <h3 className={cx('name')}>{todaySuggestPlaylist.title}</h3>
                            <p className={cx('desc')}>{todaySuggestPlaylist.sortDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playlists;
