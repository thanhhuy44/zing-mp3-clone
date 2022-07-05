import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Loading from '../Loading';

import classNames from 'classnames/bind';
import styles from './Artist.module.scss';
import Button from '~/components/Button';
import Playlists from '~/layouts/components/Playlists';
import SongItem from '~/layouts/components/SongItem';
import {
    setIsPlay,
    setPlaylistSong,
    setSongId,
    setInfoSongPlayer,
    setIsRadioPlay,
    setRandom,
    setPrevSong,
    setPlaylistId,
} from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function Artist() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { artistName } = location.state;
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [isFullList, setIsFullList] = useState(false);
    const [contentBtn, setContentBtn] = useState('Xem Tất Cả');

    const isPlay = useSelector((state) => state.audio.isPlay);
    const songInfo = useSelector((state) => state.audio.infoSongPlayer);
    const playlistSong = useSelector((state) => state.audio.playlistSong);

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/artist?name=${artistName}`).then((res) => {
            setData(res.data.data);
            setSongs(res.data.data.sections[0].items.slice(0, 5));
            setIsLoading(false);
        });
    }, []);

    const handleFullList = () => {
        if (isFullList) {
            setSongs(data.sections[0].items.slice(0, 5));
            setIsFullList(false);
            setContentBtn('Xem Tất Cả');
        } else {
            setSongs(data.sections[0].items);
            setIsFullList(true);
            setContentBtn('Thu Gọn');
        }
        console.log(contentBtn);
    };

    const handlePlay = (song, list) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setPlaylistId(''));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong(list));
        dispatch(setSongId(song.encodeId));
        dispatch(setIsPlay(true));
    };

    const handlePlayRandom = (playlist) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setPrevSong([]));
        let newPlaylist = [];
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i].streamingStatus === 1) {
                newPlaylist.push(playlist[i]);
            }
        }
        const indexRandom = Math.floor(Math.random() * newPlaylist.length - 1);
        const randomSong = newPlaylist[indexRandom] || newPlaylist[0];
        dispatch(setInfoSongPlayer(randomSong));
        dispatch(setSongId(randomSong.encodeId));
        dispatch(setIsPlay(true));
        dispatch(setRandom(true));
        dispatch(setPlaylistSong(shuffle(newPlaylist)));
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <div className={cx('bio')}>
                        <h1 className={cx('name')}>{data.name}</h1>
                        <p className={cx('desc')}>{data.sortBiography}</p>

                        <Button
                            type="primary"
                            leftIcon={<FontAwesomeIcon icon={faPlay} />}
                            className={cx('play-btn')}
                            onClick={() => {
                                handlePlayRandom(data.sections[0].items);
                            }}
                        >
                            PHÁT NHẠC
                        </Button>
                    </div>
                    <div className={cx('avatar')}>
                        <img alt={data.alias} src={data.thumbnailM} className={cx('artist-img')} />
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('songs-section')}>
                        <h1 className={cx('section-name')}>Bài Hát Nổi Bật</h1>
                        {songs.map((song, index) => (
                            <SongItem
                                data={song}
                                key={index}
                                onClick={() => handlePlay(song, data.sections[0].items)}
                            />
                        ))}
                        <div className={cx('option')}>
                            <Button type="rounded" onClick={handleFullList}>
                                {contentBtn}
                            </Button>
                        </div>
                    </div>
                    {data.sections.map((section, index) => {
                        if (section.sectionType === 'playlist') {
                            return <Playlists key={index} data={section} />;
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Artist;
