import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShuffle,
    faBackwardStep,
    faForwardStep,
    faPlayCircle,
    faPauseCircle,
    faRepeat,
    faVolumeHigh,
    faExpand,
} from '@fortawesome/free-solid-svg-icons';
import ReactHlsPlayer from 'react-hls-player/dist';
import classNames from 'classnames/bind';
import styles from './Player.module.scss';
import Button from '~/components/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
    setInfoSongPlayer,
    setCurrentTime,
    setSrcAudio,
    setIsPlay,
    setPlaylistSong,
    setSongId,
    setPrevSong,
    setRandom,
    setLoop,
    setPlaylistId,
    setVolume,
    setIsRadioPlay,
} from '~/redux/features/audioSlice';
import axios from 'axios';

const cx = classNames.bind(styles);

function Player() {
    const srcAudio = useSelector((state) => state.audio.srcAudio);
    const dispatch = useDispatch();
    const currentSongId = useSelector((state) => state.audio.songId);
    const songInfo = useSelector((state) => state.audio.infoSongPlayer);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const isLoop = useSelector((state) => state.audio.isLoop);
    const isRandom = useSelector((state) => state.audio.isRandom);
    const playlistSong = [...useSelector((state) => state.audio.playlistSong)];
    const currentTime = useSelector((state) => state.audio.currentTime);
    const prevSong = [...useSelector((state) => state.audio.prevSong)];
    const playlistId = useSelector((state) => state.audio.playlistId);
    const volume = useSelector((state) => state.audio.volume);
    const srcRadio = useSelector((state) => state.audio.srcRadio);
    const isRadioPlay = useSelector((state) => state.audio.isRadioPlay);
    const audioRef = useRef();
    const radioRef = useRef();
    const volumeRef = useRef();
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

    const handlePlaySong = () => {
        if (isPlay) {
            dispatch(setIsPlay(false));
            if (audioRef) {
                audioRef.current.pause();
            }
        } else {
            dispatch(setIsPlay(true));
            if (audioRef) {
                audioRef.current.play();
            }
        }
    };

    const handlePlayRadio = () => {
        if (isRadioPlay) {
            dispatch(setIsRadioPlay(false));
            if (radioRef) {
                radioRef.current.pause();
            }
        } else {
            dispatch(setIsRadioPlay(true));
            if (radioRef) {
                console.log(audioRef.current.volume);
                radioRef.current.play();
            }
        }
    };

    const handleOnEnd = () => {
        if (!isLoop) {
            dispatch(setPrevSong([songInfo, ...prevSong]));
            dispatch(setCurrentTime(0));
            dispatch(setIsPlay(false));
            if (playlistSong !== undefined && playlistSong.length > 1) {
                dispatch(setInfoSongPlayer(playlistSong[0]));

                dispatch(setSongId(playlistSong[0].encodeId));

                playlistSong.shift();
                dispatch(setIsPlay(true));
                dispatch(setPlaylistSong(playlistSong));
            }
            if (playlistSong !== undefined && playlistSong.length === 1) {
                dispatch(setPlaylistSong([]));
                dispatch(setPlaylistId(''));
            }
        }
    };

    const handleChangeProgressSong = (value) => {
        dispatch(setCurrentTime(value));
        audioRef.current.currentTime = value;
    };

    const handleNextSong = () => {
        dispatch(setPrevSong([songInfo, ...prevSong]));
        dispatch(setCurrentTime(0));
        dispatch(setIsPlay(false));
        if (playlistSong !== undefined && playlistSong.length > 0) {
            dispatch(setInfoSongPlayer(playlistSong[0]));

            dispatch(setSongId(playlistSong[0].encodeId));

            playlistSong.shift();
            dispatch(setIsPlay(true));
            dispatch(setPlaylistSong(playlistSong));
        }
    };

    const handleLoop = () => {
        if (isLoop) {
            dispatch(setLoop(false));
        } else {
            dispatch(setLoop(true));
        }
    };

    const handleRandom = () => {
        if (playlistId !== null && playlistId !== '') {
            axios.get(`http://localhost:3001/api/detailplaylist?id=${playlistId}`).then((res) => {
                let playlist = [];
                for (var i = 0; i < res.data.data.song.items.length; i++) {
                    if (res.data.data.song.items[i].streamingStatus === 1) {
                        playlist.push(res.data.data.song.items[i]);
                    }
                }
                if (isRandom) {
                    dispatch(setRandom(false));

                    dispatch(setPlaylistSong(playlist));
                } else {
                    dispatch(setRandom(true));

                    dispatch(setPlaylistSong(shuffle(playlist)));
                }
            });
        } else {
            if (isRandom) {
                dispatch(setRandom(false));
            } else {
                dispatch(setRandom(true));
            }
        }
        console.log(playlistId);
    };

    const handlePrevSong = () => {
        if (audioRef.current.currentTime <= 5) {
            if (prevSong.length === 0) {
                audioRef.current.currentTime = 0;
            } else if (prevSong.length === 1) {
                dispatch(setPlaylistSong([songInfo, ...playlistSong]));
                dispatch(setInfoSongPlayer(prevSong[0]));
                dispatch(setSongId(prevSong[0].encodeId));
                dispatch(setPrevSong([]));
            } else {
                dispatch(setInfoSongPlayer(prevSong[0]));
                dispatch(setSongId(prevSong[0].encodeId));
                dispatch(setPlaylistSong([songInfo, ...playlistSong]));
                prevSong.shift();
                dispatch(setPrevSong(prevSong));
            }
        } else {
            audioRef.current.currentTime = 0;
            dispatch(setIsPlay(true));
        }
    };

    const handleVolume = () => {
        dispatch(setVolume(volumeRef.current.value));
        audioRef.current.volume = volumeRef.current.value / 100;
        radioRef.current.volume = volumeRef.current.value / 100;
    };

    const handleMute = () => {
        if (volume === 0) {
            dispatch(setVolume(20));
            audioRef.current.volume = 0.2;
            radioRef.current.volume = 0.2;
        } else {
            dispatch(setVolume(0));
            audioRef.current.volume = 0;
            radioRef.current.volume = 0;
        }
    };

    useEffect(() => {
        if (srcAudio !== '') {
            isPlay ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [srcAudio, isPlay]);
    useEffect(() => {
        if (srcRadio !== '') {
            isRadioPlay ? radioRef.current.play() : radioRef.current.pause();
        }
    }, [srcRadio, isRadioPlay]);
    useEffect(() => {
        if (currentSongId !== null && currentSongId !== '') {
            axios.get(`http://localhost:3001/api/song?id=${currentSongId}`).then((res) => {
                dispatch(setSrcAudio(res.data.data[128]));
            });
        }
    }, [currentSongId, dispatch]);
    return (
        <div className={cx('container')}>
            <div className={cx('info')}>
                <img className={cx('img')} src={songInfo.thumbnailM} alt={songInfo.alias} />
                <div className={cx('name')}>
                    <h3 className={cx('title')}>{songInfo.title}</h3>
                    <p className={cx('artists')}>
                        {songInfo.artistsNames || songInfo.activeUsers + ' người đang nghe'}
                    </p>
                </div>
            </div>
            <div className={cx('control')}>
                {songInfo.status === 2 ? (
                    <Button className={cx('control-btn', 'play-btn')} type="circle" onClick={handlePlayRadio}>
                        {isRadioPlay ? (
                            <FontAwesomeIcon type="rounded" icon={faPauseCircle} />
                        ) : (
                            <FontAwesomeIcon type="rounded" icon={faPlayCircle} />
                        )}
                    </Button>
                ) : (
                    <div className={cx('handler')}>
                        <Button
                            className={cx('control-btn', isRandom && 'active')}
                            type="circle"
                            onClick={handleRandom}
                        >
                            <FontAwesomeIcon type="rounded" icon={faShuffle} />
                        </Button>
                        <Button className={cx('control-btn')} type="circle" onClick={handlePrevSong}>
                            <FontAwesomeIcon type="rounded" icon={faBackwardStep} />
                        </Button>
                        <Button className={cx('control-btn', 'play-btn')} type="circle" onClick={handlePlaySong}>
                            {isPlay ? (
                                <FontAwesomeIcon type="rounded" icon={faPauseCircle} />
                            ) : (
                                <FontAwesomeIcon type="rounded" icon={faPlayCircle} />
                            )}
                        </Button>
                        <Button className={cx('control-btn')} type="circle" onClick={handleNextSong}>
                            <FontAwesomeIcon type="rounded" icon={faForwardStep} />
                        </Button>
                        <Button className={cx('control-btn', isLoop && 'active')} type="circle" onClick={handleLoop}>
                            <FontAwesomeIcon type="rounded" icon={faRepeat} />
                        </Button>
                    </div>
                )}
                {songInfo.status === 2 ? (
                    ''
                ) : (
                    <div className={cx('range')}>
                        <span className={cx('time')}>
                            {Math.floor(currentTime / 60) < 10
                                ? '0' + Math.floor(currentTime / 60)
                                : Math.floor(currentTime / 60)}
                            :{currentTime % 60 < 10 ? '0' + (currentTime % 60) : currentTime % 60}
                        </span>
                        <input
                            value={currentTime}
                            type="range"
                            className={cx('song-progress')}
                            min={0}
                            max={songInfo.duration}
                            onChange={(e) => handleChangeProgressSong(e.target.value)}
                        />
                        <span className={cx('time')}>
                            {Math.floor(songInfo.duration / 60) < 10
                                ? '0' + Math.floor(songInfo.duration / 60)
                                : Math.floor(songInfo.duration / 60)}
                            :{songInfo.duration % 60 < 10 ? '0' + (songInfo.duration % 60) : songInfo.duration % 60}
                        </span>
                    </div>
                )}
            </div>
            <div className={cx('option')}>
                <div className={cx('volume')}>
                    <Button className={cx('option-btn')} type="primary" onClick={handleMute}>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </Button>
                    <input
                        type="range"
                        className="volume-progress"
                        ref={volumeRef}
                        onChange={handleVolume}
                        min={0}
                        max={100}
                        value={volume}
                    />
                </div>
                <div className={cx('full-screen')}>
                    <Button className={cx('option-btn')} type="primary">
                        <FontAwesomeIcon icon={faExpand} />
                    </Button>
                </div>
            </div>
            <audio
                loop={isLoop}
                ref={audioRef}
                src={srcAudio}
                autoPlay={isPlay}
                onTimeUpdate={() => {
                    if (audioRef.current) {
                        dispatch(setCurrentTime(Math.floor(audioRef.current.currentTime)));
                    }
                }}
                onEnded={handleOnEnd}
            />
            <ReactHlsPlayer hidden src={srcRadio} autoPlay={isRadioPlay} playerRef={radioRef} volume={volume} />
        </div>
    );
}

export default Player;
