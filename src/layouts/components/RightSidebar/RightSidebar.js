/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';

import SongItem from '../SongItem';
import {
    setCurrnetIndexSong,
    setInfoSongPlayer,
    setIsPlay,
    setPlaylistRandom,
    setSongId,
    setCurrentIndexSongRandom,
    setSrcAudio,
    setCurrentTime,
} from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function RightSidebar() {
    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.audio.infoSongPlayer);
    const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
    const currentIndexSongRandom = useSelector((state) => state.audio.currentIndexSongRandom);
    const isRandom = useSelector((state) => state.audio.isRandom);
    const playlist = [...useSelector((state) => state.audio.playlistSong)];
    const playlistRandom = [...useSelector((state) => state.audio.playlistRandom)];
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

    const handlePlaySong = (playlist, randomPlaylist, song, index) => {
        let indexSong = playlist.findIndex((item) => item.encodeId === song.encodeId);
        let randomIndexSong = playlistRandom.findIndex((item) => item.encodeId === song.encodeId);
        dispatch(setCurrentIndexSongRandom(randomIndexSong));
        dispatch(setCurrnetIndexSong(indexSong));
        dispatch(setInfoSongPlayer(song));
        dispatch(setSongId(song.encodeId));
        dispatch(setSrcAudio(''));
        dispatch(setCurrentTime(0));
        dispatch(setIsPlay(true));
    };

    useEffect(() => {
        if (isRandom) {
            dispatch(setPlaylistRandom(shuffle([...playlistRandom])));
            dispatch(setCurrentIndexSongRandom(-1));
        }
    }, [isRandom]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Danh sách phát</h1>
            </div>
            <div className={cx('content')}>
                <div className={cx('next-list')}>
                    <div>
                        <SongItem type="mini" data={currentSong} className={cx('current-song')} />
                    </div>
                    {isRandom
                        ? playlistRandom.map((song, index) => {
                              if (song.streamingStatus !== 1 || currentIndexSongRandom === index) {
                                  return;
                              } else {
                                  return (
                                      index >= currentIndexSongRandom && (
                                          <SongItem
                                              onClick={() => handlePlaySong(playlist, playlistRandom, song, index)}
                                              key={index}
                                              type="mini"
                                              data={song}
                                          />
                                      )
                                  );
                              }
                          })
                        : playlist.map((song, index) => {
                              if (song.streamingStatus !== 1 || currentIndexSong === index) {
                                  return;
                              } else {
                                  return (
                                      index >= currentIndexSong && (
                                          <SongItem
                                              onClick={() => handlePlaySong(playlist, playlistRandom, song, index)}
                                              key={index}
                                              type="mini"
                                              data={song}
                                          />
                                      )
                                  );
                              }
                          })}
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
