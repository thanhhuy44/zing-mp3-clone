import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import request from '~/utils/axios';
import SongItem from '~/layouts/components/SongItem';
import PlaylistItem from '~/layouts/components/Playlists/PlaylistItem';
import Item from '~/components/Item';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Search() {
    const loaction = useLocation();
    const { keyword } = loaction.state;
    const [data, setData] = useState({});
    const [isLoading, setIsloading] = useState(true);

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
                        <SongItem key={song.encodeId} data={song} />
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
