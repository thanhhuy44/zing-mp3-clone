import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';

import SongItem from '../SongItem';
import { setInfoSongPlayer, setPlaylistSong, setSongId } from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function RightSidebar() {
    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.audio.infoSongPlayer);
    const playlist = [...useSelector((state) => state.audio.playlistSong)];
    let nextSongs;

    const handlePlaySong = (song) => {
        playlist.shift();
        dispatch(setSongId(song.encodeId));
        dispatch(setInfoSongPlayer(song));
        nextSongs = [];
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i].encodeId !== currentSong.encodeId) {
                nextSongs.push(playlist[i]);
            }
        }
        dispatch(setPlaylistSong(nextSongs));
    };
    nextSongs = playlist;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Danh sách phát</h1>
            </div>
            <div className={cx('content')}>
                <div className={cx('current-song')}>
                    <SongItem data={currentSong} type="mini" />
                </div>
                <div className={cx('next-list')}>
                    {nextSongs.map((song, index) => {
                        if (song.encodeId === currentSong.encodeId || song.streamingStatus !== 1) {
                            return;
                        } else {
                            return (
                                <SongItem onClick={() => handlePlaySong(song)} key={index} type="mini" data={song} />
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
