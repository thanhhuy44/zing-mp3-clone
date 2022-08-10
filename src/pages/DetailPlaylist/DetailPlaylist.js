/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import request from '~/utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPlay, faPause, faPauseCircle } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './DetailPlaylist.module.scss';
import Button from '~/components/Button';
import SongItem from '~/layouts/components/SongItem';

import { useSelector, useDispatch } from 'react-redux';
import {
    setSongId,
    setInfoSongPlayer,
    setPlaylistSong,
    setIsPlay,
    setRandom,
    setPlaylistId,
    setIsRadioPlay,
    setCurrnetIndexSong,
    setPlaylistRandom,
    setCurrentIndexSongRandom,
    setCurrentTime,
    setSrcAudio,
} from '~/redux/features/audioSlice';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function DetailPlaylist() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id, onPlay } = location.state;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isRandom = useSelector((state) => state.audio.isRandom);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const playlistId = useSelector((state) => state.audio.playlistId);

    const thumbRef = useRef();
    const imgRef = useRef();

    // function shuffle(array) {
    //     var currentIndex = array.length,
    //         temporaryValue,
    //         randomIndex;

    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {
    //         // Pick a remaining element...
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex -= 1;

    //         // And swap it with the current element.
    //         temporaryValue = array[currentIndex];
    //         array[currentIndex] = array[randomIndex];
    //         array[randomIndex] = temporaryValue;
    //     }

    //     return array;
    // }

    function shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    const getCurrentIndexSong = (playlist, song) => {
        return playlist.indexOf(song);
    };

    const handleGetSong = (song, playlist, id) => {
        let playlistCanPlay = [];
        if (song.streamingStatus === 1 && song.isWorldWide) {
            dispatch(setIsRadioPlay(false));
            dispatch(setPlaylistId(id));
            dispatch(setCurrentTime(0));
            dispatch(setSrcAudio(''));
            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].streamingStatus === 1 && playlist[i].isWorldWide) {
                    playlistCanPlay.push(playlist[i]);
                }
            }
            if (isRandom) {
                dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
                dispatch(setSongId(song.encodeId));
                dispatch(setInfoSongPlayer(song));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrnetIndexSong(getCurrentIndexSong(playlistCanPlay, song)));
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setIsPlay(true));
            } else {
                dispatch(setPlaylistRandom(playlistCanPlay));
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setInfoSongPlayer(song));
                dispatch(setSongId(song.encodeId));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrnetIndexSong(getCurrentIndexSong(playlistCanPlay, song)));
                dispatch(setIsPlay(true));
            }
        } else {
            alert('This is vip song');
        }
    };

    const handlePlaylist = () => {
        isPlay ? dispatch(setIsPlay(false)) : dispatch(setIsPlay(true));
    };

    const handlePlayRandom = async (playlist, id) => {
        let songsCanPlay = [];
        let randomIndex;

        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i].streamingStatus === 1 && playlist[i].isWorldWide) {
                await songsCanPlay.push(playlist[i]);
            }
        }
        await songsCanPlay;
        if (songsCanPlay.length === 0) {
            alert('This is vip playlist');
        } else {
            dispatch(setPlaylistId(id));
            dispatch(setIsPlay(true));
            dispatch(setIsRadioPlay(false));
            dispatch(setCurrentTime(0));
            dispatch(setSrcAudio(''));
            randomIndex = Math.floor(Math.random() * songsCanPlay.length - 1) + 1;
            dispatch(setSongId(songsCanPlay[randomIndex].encodeId));
            dispatch(setInfoSongPlayer(songsCanPlay[randomIndex]));
            dispatch(setPlaylistSong(songsCanPlay));
            dispatch(setPlaylistRandom(shuffle([...songsCanPlay])));
            dispatch(setCurrnetIndexSong(randomIndex));
            dispatch(setCurrentIndexSongRandom(-1));
            dispatch(setRandom(true));
        }
    };

    useEffect(() => {
        setIsLoading(true);
        request.get(`/playlist/${id}`).then(async (res) => {
            setData(res.data);
            setIsLoading(false);
            document.title = res.data.title;
            if (onPlay) {
                handlePlayRandom(res.data.song.items, id);
            }
        });
    }, [id]);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <div
                        ref={thumbRef}
                        className={cx('avatar', isPlay && data.encodeId === playlistId ? 'avatar-playing' : '')}
                    >
                        <img
                            ref={imgRef}
                            src={data.thumbnailM}
                            alt={data.aliasTitle}
                            className={cx('playlist-img', isPlay && data.encodeId === playlistId ? 'img-playing' : '')}
                        />
                        {playlistId === data.encodeId && isPlay ? (
                            <div
                                className={cx('play')}
                                onClick={() => {
                                    dispatch(setIsPlay(false));
                                }}
                            >
                                <FontAwesomeIcon icon={faPauseCircle} />
                            </div>
                        ) : (
                            ''
                        )}
                        {playlistId === data.encodeId && isPlay === false ? (
                            <div className={cx('play')} onClick={() => dispatch(setIsPlay(true))}>
                                <FontAwesomeIcon icon={faPlayCircle} />
                            </div>
                        ) : (
                            ''
                        )}
                        {playlistId !== data.encodeId ? (
                            <div
                                className={cx('play')}
                                onClick={() => handlePlayRandom(data.song.items, data.encodeId)}
                            >
                                <FontAwesomeIcon icon={faPlayCircle} />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={cx('desc')}>
                        <h3 className={cx('title')}>{data.title}</h3>
                        <p className={cx('time')}>Cập nhật: {new Date(1655863942 * 1000).toLocaleDateString()}</p>
                        <div className={cx('artists')}>
                            {data.artists ? (
                                data.artists.map((artist, index) => (
                                    <span key={artist.id}>
                                        <Link
                                            className={cx('artist-link')}
                                            to={artist.link}
                                            state={{ artistName: artist.alias }}
                                        >
                                            {artist.name}
                                        </Link>
                                        {index + 1 === data.artists.length ? '' : ', '}
                                    </span>
                                ))
                            ) : (
                                <span>Người tạo: {data.userName}</span>
                            )}
                        </div>
                        <p className={cx('liked')}>{data.like} người yêu thích</p>
                    </div>
                    <div className={cx('play-playlist')}>
                        {playlistId === data.encodeId && isPlay ? (
                            <Button
                                type="primary"
                                className={cx('play-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPause} />}
                                onClick={handlePlaylist}
                            >
                                TẠM DỪNG
                            </Button>
                        ) : (
                            ''
                        )}
                        {playlistId === data.encodeId && isPlay === false ? (
                            <Button
                                type="primary"
                                className={cx('play-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                onClick={handlePlaylist}
                            >
                                TIẾP TỤC PHÁT
                            </Button>
                        ) : (
                            ''
                        )}
                        {playlistId !== data.encodeId ? (
                            <Button
                                type="primary"
                                className={cx('play-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                onClick={() => handlePlayRandom(data.song.items, data.encodeId)}
                            >
                                PHÁT NGẪU NHIÊN
                            </Button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('sort-description')}>
                        <p>Lời tựa: {data.sortDescription}</p>
                    </div>
                    <SongItem />
                    {data.song.items.map((item) => (
                        <SongItem
                            key={item.encodeId}
                            data={item}
                            onClick={() => handleGetSong(item, data.song.items, data.encodeId)}
                        />
                    ))}
                    {data.sections
                        ? data.sections.map((section, index) => (
                              <div className={cx('section')} key={index}>
                                  <h2 className={cx('section-title')}>{section.title}</h2>
                                  {section.items.map((item) => (
                                      <SongItem
                                          key={item.encodeId}
                                          data={item}
                                          onClick={() => handleGetSong(item, section.items)}
                                      />
                                  ))}
                              </div>
                          ))
                        : ''}
                </div>
            </div>
        );
    }
}

export default DetailPlaylist;
