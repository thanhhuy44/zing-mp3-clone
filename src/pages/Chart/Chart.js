import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Chart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import request from '~/utils/axios';
import ChartSongs from './components/ChartSongs';
import WeekChart from './components/WeekChart';

import { useDispatch, useSelector } from 'react-redux';
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
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Chart() {
    const dispatch = useDispatch();
    const isRandom = useSelector((state) => state.audio.isRandom);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const playlistId = useSelector((state) => state.audio.playlistId);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([]);

    function shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    const handlePlaySong = (song, playlist, id) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setPlaylistId(id));
        dispatch(setCurrentTime(0));
        dispatch(setSrcAudio(''));
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
    };

    useEffect(() => {
        request.get('/chart/home').then((res) => {
            setIsLoading(false);
            setResult(res.data);
            document.title = '#zingchart';
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>#zingchart</h1>
                    {result.RTChart.sectionId !== playlistId && (
                        <button
                            className={cx('play-btn')}
                            onClick={() => {
                                handlePlaySong(result.RTChart.items[0], result.RTChart.items);
                                dispatch(setRandom(false));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    )}
                    {result.RTChart.sectionId === playlistId && isPlay && (
                        <button
                            className={cx('play-btn')}
                            onClick={() => {
                                dispatch(setIsPlay(false));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    )}
                    {result.RTChart.sectionId === playlistId && !isPlay && (
                        <button
                            className={cx('play-btn')}
                            onClick={() => {
                                dispatch(setIsPlay(true));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    )}
                </div>
                <ChartSongs data={result} onClick={handlePlaySong} />
                <WeekChart data={result.weekChart} onClick={handlePlaySong} />
            </div>
        );
    }
}

export default Chart;
