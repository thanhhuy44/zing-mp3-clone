import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '~/utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './NewMusic.module.scss';
import SongItem from '~/layouts/components/SongItem';
import Button from '~/components/Button';
import Loading from '../Loading';

import {
    setSrcAudio,
    setCurrentTime,
    setInfoSongPlayer,
    setSongId,
    setPlaylistSong,
    setIsPlay,
    setPlaylistId,
    setIsRadioPlay,
    setPlaylistRandom,
    setCurrnetIndexSong,
    setCurrentIndexSongRandom,
    setRandom,
} from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function NewMusic() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const isRandom = useSelector((state) => state.audio.isRandom);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const playlistId = useSelector((state) => state.audio.playlistId);

    const shuffle = (sourceArray) => {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    };

    const handlePlaySong = (song, playlist, id) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setCurrentTime(0));
        dispatch(setSrcAudio(''));
        dispatch(setPlaylistId(id));
        let playlistCanPlay = [];
        if (song.streamingStatus === 1) {
            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].streamingStatus === 1) {
                    playlistCanPlay.push(playlist[i]);
                }
            }
            if (isRandom) {
                dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
                dispatch(setSongId(song.encodeId));
                dispatch(setInfoSongPlayer(song));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrnetIndexSong(playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)));
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setIsPlay(true));
            } else {
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setInfoSongPlayer(song));
                dispatch(setSongId(song.encodeId));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrnetIndexSong(playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)));
                dispatch(setIsPlay(true));
            }
        } else {
            alert('This is vip song');
        }
        console.log(playlistId);
    };

    useEffect(() => {
        request.get('/chart/new-release').then((res) => {
            setData(res.data);
            setIsLoading(false);
            document.title = res.data.title;
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>{data.title}</h3>
                    {isPlay && playlistId === data.sectionId ? (
                        <Button
                            className={cx('play-btn')}
                            type="circle"
                            onClick={() => {
                                dispatch(setIsPlay(false));
                            }}
                        >
                            <FontAwesomeIcon icon={faPause} />
                        </Button>
                    ) : (
                        ''
                    )}
                    {!isPlay && playlistId === data.sectionId ? (
                        <Button
                            className={cx('play-btn')}
                            type="circle"
                            onClick={() => {
                                dispatch(setIsPlay(true));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    ) : (
                        ''
                    )}
                    {playlistId !== data.sectionId ? (
                        <Button
                            className={cx('play-btn')}
                            type="circle"
                            onClick={() => {
                                dispatch(setRandom(false));
                                handlePlaySong(data.items[0], data.items, data.sectionId);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    ) : (
                        ''
                    )}
                </div>

                <div className={cx('content')}>
                    {data.items.map((song, index) => (
                        <SongItem
                            serial={true}
                            data={song}
                            index={index}
                            onClick={() => handlePlaySong(song, data.items, data.sectionId)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default NewMusic;
