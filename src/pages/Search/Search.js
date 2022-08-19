import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    setIsRadioPlay,
    setIsPlay,
    setSongId,
    setInfoSongPlayer,
    setPlaylistSong,
    setPlaylistRandom,
    setLoop,
} from '~/redux/features/audioSlice';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import request from '~/utils/axios';
import SongItem from '~/layouts/components/SongItem';
import Item from '~/components/Item';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Search() {
    const loaction = useLocation();
    const { keyword } = loaction.state;
    const [data, setData] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const dispatch = useDispatch();

    const handlePlaySong = (song) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setIsPlay(false));
        dispatch(setSongId(song.encodeId));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong([song]));
        dispatch(setPlaylistRandom([song]));
        dispatch(setLoop(true));
    };

    useEffect(() => {
        request.get(`/search?keyword=${keyword}`).then((res) => {
            setIsloading(false);
            setData(res.data);
        });
    }, [keyword]);
    console.log(data);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <h1>Kết quả tìm kiếm cho từ khóa "{keyword}"</h1>
                <div className={cx('section', 'song')}>
                    <h2 className={cx('section-title')}>Bài hát</h2>
                    {data.songs.map((song) => (
                        <SongItem onClick={() => handlePlaySong(song)} key={song.encodeId} data={song} />
                    ))}
                </div>
                <div className={cx('section', 'playlists')}>
                    <h2 className={cx('section-title')}>Playlist/Album</h2>
                    <div className={cx('playlist')}>
                        {data.playlists.map((playlist, index) => (
                            <Item data={playlist} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
