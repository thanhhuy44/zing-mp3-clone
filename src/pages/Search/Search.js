import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import axios from 'axios';
import SongItem from '~/layouts/components/SongItem';
import Playlists from '~/layouts/components/Playlists';
import PlaylistItem from '~/layouts/components/Playlists/PlaylistItem';

const cx = classNames.bind(styles);

function Search() {
    const loaction = useLocation();
    const { keyword } = loaction.state;
    const [data, setData] = useState({});
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/search?keyword=${keyword}`).then((res) => {
            setIsloading(false);
            setData(res.data.data);
        });
    }, [keyword]);
    console.log(data);

    if (isLoading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className={cx('container')}>
                <h1>Kết quả tìm kiếm cho từ khóa "{keyword}"</h1>
                <div className={cx('section', 'song')}>
                    <h2 className={cx('section-title')}>Bài hát</h2>
                    {data.songs.map((song) => (
                        <SongItem data={song} />
                    ))}
                </div>
                <div className={cx('section', 'playlists')}>
                    <h2 className={cx('section-title')}>Playlist/Album</h2>
                    <div className={cx('playlist')}>
                        {data.playlists.map((playlist, index) =>
                            index < 5 ? <PlaylistItem playlist={playlist} /> : '',
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
