import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPlay } from '@fortawesome/free-solid-svg-icons';

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
} from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function DetailPlaylist() {
    const dispath = useDispatch();
    const location = useLocation();
    const { id } = location.state;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isRandom = useSelector((state) => state.audio.isRandom);

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
        dispath(setPrevSong([]));
        dispath(setPlaylistId(playlist.encodeId));
        let newPlaylist = [];
        for (var i = 0; i < playlist.song.items.length; i++) {
            if (playlist.song.items[i].streamingStatus === 1) {
                newPlaylist.push(playlist.song.items[i]);
            }
        }
        if (song.streamingStatus === 1) {
            dispath(setInfoSongPlayer(song));
            dispath(setSongId(song.encodeId));
            if (isRandom) {
                dispath(setPlaylistSong(shuffle(newPlaylist)));
                dispath(setRandom(true));
            } else {
                dispath(setPlaylistSong(playlist));
            }
            dispath(setIsPlay(true));
        } else {
            alert('this is vip song');
        }
    };

    const handlePlayRandom = (playlist) => {
        dispath(setPrevSong([]));
        let newPlaylist = [];
        for (var i = 0; i < playlist.song.items.length; i++) {
            if (playlist.song.items[i].streamingStatus === 1) {
                newPlaylist.push(playlist.song.items[i]);
            }
        }
        const indexRandom = Math.floor(Math.random() * newPlaylist.length - 1);
        const randomSong = newPlaylist[indexRandom];
        dispath(setInfoSongPlayer(randomSong));
        dispath(setSongId(randomSong.encodeId));
        dispath(setRandom(true));
        dispath(setPlaylistSong(shuffle(newPlaylist)));
        dispath(setIsPlay(true));
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/detailplaylist?id=${id}`).then((res) => {
            setIsLoading(false);
            setData(res.data.data);
        });
    }, [id]);
    if (isLoading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <div className={cx('avatar')}>
                        <img src={data.thumbnailM} alt={data.aliasTitle} className={cx('playlist-img')} />
                        <div className={cx('play')}>
                            <FontAwesomeIcon icon={faPlayCircle} />
                        </div>
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
                        <Button
                            type="primary"
                            className={cx('play-btn')}
                            leftIcon={<FontAwesomeIcon icon={faPlay} />}
                            onClick={() => handlePlayRandom(data)}
                        >
                            Phát Ngẫu Nhiên
                        </Button>
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
                        ? data.sections.map((section) => (
                              <div className={cx('section')}>
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
