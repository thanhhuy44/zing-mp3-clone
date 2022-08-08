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
    setPrevSong,
    setInfoSongPlayer,
    setSongId,
    setPlaylistSong,
    setIsPlay,
    setPlaylistId,
    setIsRadioPlay,
} from '~/redux/features/audioSlice';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Chart() {
    const dispatch = useDispatch();
    const isRandom = useSelector((state) => state.audio.isRandom);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([]);

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

    const handlePlaySong = (song, playlist) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setPrevSong([]));
        let newPlaylist = [];
        if (playlist) {
            dispatch(setPlaylistId(playlist.encodeId || playlist.playlistId));
            for (var i = 0; i < playlist.items.length; i++) {
                if (playlist.items[i].streamingStatus === 1) {
                    newPlaylist.push(playlist.items[i]);
                }
            }
        }
        if (song.streamingStatus === 1) {
            dispatch(setInfoSongPlayer(song));
            dispatch(setSongId(song.encodeId));
            if (isRandom) {
                dispatch(setPlaylistSong(shuffle(newPlaylist)));
            } else {
                dispatch(setPlaylistSong(playlist.items));
            }
        } else {
            alert('this is vip song');
        }
        dispatch(setIsPlay(true));
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
                    <button className={cx('play-btn')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                </div>
                <ChartSongs data={result} onClick={handlePlaySong} />
                <WeekChart data={result.weekChart} onClick={handlePlaySong} />
            </div>
        );
    }
}

export default Chart;
