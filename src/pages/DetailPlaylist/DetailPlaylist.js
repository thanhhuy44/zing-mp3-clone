import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
    setPrevSong,
    setIsRadioPlay,
} from '~/redux/features/audioSlice';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function DetailPlaylist() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = location.state;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isRandom = useSelector((state) => state.audio.isRandom);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const playlistId = useSelector((state) => state.audio.playlistId);

    const thumbRef = useRef();
    const imgRef = useRef();

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

    const handleGetSong = (song, playlist) => {
        dispatch(setPrevSong([]));
        dispatch(setIsRadioPlay(false));
        let newPlaylist = [];
        if (playlist) {
            dispatch(setPlaylistId(playlist.encodeId));
            for (var i = 0; i < playlist.song.items.length; i++) {
                if (playlist.song.items[i].streamingStatus === 1) {
                    newPlaylist.push(playlist.song.items[i]);
                }
            }
        }
        if (song.streamingStatus === 1) {
            dispatch(setInfoSongPlayer(song));
            dispatch(setSongId(song.encodeId));
            if (isRandom) {
                dispatch(setPlaylistSong(shuffle(newPlaylist)));
                dispatch(setRandom(true));
            } else {
                dispatch(setPlaylistSong(newPlaylist));
            }
            dispatch(setIsPlay(true));
        } else {
            alert('this is vip song');
        }
    };

    const handlePlaylist = () => {
        isPlay ? dispatch(setIsPlay(false)) : dispatch(setIsPlay(true));
    };

    const handlePlayRandom = (playlist) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setPrevSong([]));
        let newPlaylist = [];
        for (var i = 0; i < playlist.song.items.length; i++) {
            if (playlist.song.items[i].streamingStatus === 1) {
                newPlaylist.push(playlist.song.items[i]);
            }
        }
        const indexRandom = Math.floor(Math.random() * newPlaylist.length - 1);
        const randomSong = newPlaylist[indexRandom] || newPlaylist[0];
        dispatch(setInfoSongPlayer(randomSong));
        dispatch(setSongId(randomSong.encodeId));
        dispatch(setPlaylistId(playlist.encodeId));
        dispatch(setIsPlay(true));
        dispatch(setRandom(true));
        dispatch(setPlaylistSong(shuffle(newPlaylist)));
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/detailplaylist?id=${id}`).then((res) => {
            setIsLoading(false);
            setData(res.data.data);
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
                            <div className={cx('play')} onClick={() => handlePlayRandom(data)}>
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
                                        <Link className={cx('artist-link')} to={artist.link}>
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
                                onClick={() => handlePlayRandom(data)}
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
                        <SongItem key={item.encodeId} data={item} onClick={() => handleGetSong(item, data)} />
                    ))}
                    {data.sections
                        ? data.sections.map((section, index) => (
                              <div className={cx('section')} key={index}>
                                  <h2 className={cx('section-title')}>{section.title}</h2>
                                  {section.items.map((item) => (
                                      <SongItem key={item.encodeId} data={item} onClick={() => handleGetSong(item)} />
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
