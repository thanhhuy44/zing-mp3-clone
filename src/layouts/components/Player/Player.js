import { useEffect, useRef, useState } from 'react';
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
    faCompress,
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
    setSongId,
    setRandom,
    setLoop,
    setVolume,
    setIsRadioPlay,
    setCurrnetIndexSong,
    setCurrentIndexSongRandom,
} from '~/redux/features/audioSlice';
import request from '~/utils/axios';

const cx = classNames.bind(styles);

function Player() {
    const [isFull, setIsFull] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const srcAudio = useSelector((state) => state.audio.srcAudio);
    const dispatch = useDispatch();
    const currentSongId = useSelector((state) => state.audio.songId);
    let currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
    let currentIndexSongRandom = useSelector((state) => state.audio.currentIndexSongRandom);
    const songInfo = useSelector((state) => state.audio.infoSongPlayer);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const isLoop = useSelector((state) => state.audio.isLoop);
    const isRandom = useSelector((state) => state.audio.isRandom);
    const playlistSong = [...useSelector((state) => state.audio.playlistSong)];
    const playlistRandom = [...useSelector((state) => state.audio.playlistRandom)];
    const currentTime = useSelector((state) => state.audio.currentTime);
    const volume = useSelector((state) => state.audio.volume);
    const srcRadio = useSelector((state) => state.audio.srcRadio);
    const isRadioPlay = useSelector((state) => state.audio.isRadioPlay);
    const audioRef = useRef();
    const volumeRef = useRef();
    const radioRef = useRef();

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
                radioRef.current.play();
            }
        }
    };

    const handleOnEnd = () => {
        if (!isLoop) {
            dispatch(setCurrentTime(0));
            dispatch(setIsPlay(false));
            if (isRandom) {
                dispatch(setCurrentIndexSongRandom((currentIndexSongRandom += 1)));
                dispatch(setInfoSongPlayer(playlistRandom[currentIndexSongRandom]));
                dispatch(setSongId(playlistRandom[currentIndexSongRandom].encodeId));
                dispatch(setCurrnetIndexSong(playlistSong.indexOf(playlistRandom[currentIndexSongRandom])));
                dispatch(setIsPlay(true));
            } else {
                dispatch(setCurrnetIndexSong((currentIndexSong += 1)));
                dispatch(setInfoSongPlayer(playlistSong[currentIndexSong]));
                dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
                dispatch(setIsPlay(true));
            }
        }
    };

    const handleChangeProgressSong = (value) => {
        dispatch(setCurrentTime(value));
        audioRef.current.currentTime = value;
    };

    const handleNextSong = () => {
        if (
            currentIndexSong === playlistSong.length - 1 ||
            currentIndexSong >= playlistSong.length - 1 ||
            currentIndexSongRandom === playlistRandom.length - 1 ||
            currentIndexSongRandom >= playlistRandom.length - 1
        ) {
            return;
        } else {
            dispatch(setSrcAudio(''));
            dispatch(setCurrentTime(0));
            audioRef.current.currentTime = 0;
            if (isRandom) {
                dispatch(setCurrentIndexSongRandom((currentIndexSongRandom += 1)));
                dispatch(setInfoSongPlayer(playlistRandom[currentIndexSongRandom]));
                dispatch(setSongId(playlistRandom[currentIndexSongRandom].encodeId));
                dispatch(setCurrnetIndexSong(playlistSong.indexOf(playlistRandom[currentIndexSongRandom])));
            } else {
                dispatch(setCurrnetIndexSong((currentIndexSong += 1)));
                dispatch(setInfoSongPlayer(playlistSong[currentIndexSong]));
                dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
            }
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
        if (isRandom) {
            dispatch(setRandom(false));
        } else {
            dispatch(setCurrentIndexSongRandom(-1));
            dispatch(setRandom(true));
        }
    };

    const handlePrevSong = () => {
        if (currentTime >= 5) {
            dispatch(() => setCurrentTime(0));
            audioRef.current.currentTime = 0;
        } else {
            if (isRandom) {
                if (currentIndexSongRandom <= 0 || currentIndexSongRandom >= playlistRandom.length - 1) {
                    dispatch(() => setCurrentTime(0));
                    audioRef.current.currentTime = 0;
                } else {
                    dispatch(setCurrentIndexSongRandom((currentIndexSongRandom -= 1)));
                    dispatch(setInfoSongPlayer(playlistRandom[currentIndexSongRandom]));
                    dispatch(setSongId(playlistRandom[currentIndexSongRandom].encodeId));
                    dispatch(
                        setCurrnetIndexSong(playlistSong.findIndex((item) => item.encodeId === songInfo.encodeId)),
                    );
                    dispatch(setSrcAudio(''));
                    dispatch(setCurrentTime(0));
                    dispatch(setIsPlay(true));
                }
            } else {
                if (currentIndexSong === 0 || currentIndexSong >= playlistSong.length - 1) {
                    dispatch(() => setCurrentTime(0));
                    audioRef.current.currentTime = 0;
                } else {
                    dispatch(setCurrnetIndexSong((currentIndexSong -= 1)));
                    dispatch(setInfoSongPlayer(playlistSong[currentIndexSong]));
                    dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
                    dispatch(setCurrentTime(0));
                    dispatch(setSrcAudio(''));
                    audioRef.current.currentTime = 0;
                    dispatch(setIsPlay(true));
                }
            }
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
            request.get(`song/${currentSongId}`).then(async (res) => {
                if (res.data) {
                    dispatch(setSrcAudio(res.data[128]));
                } else {
                    dispatch(setIsPlay(false));
                }
            });
        }
    }, [currentSongId, dispatch]);
    useEffect(() => {
        console.log(isMouseEnter);
    }, [isMouseEnter]);
    return (
        <div className={cx('container', isFull && 'full')}>
            <div className={cx('full-player')}>
                <div className={cx('thumb')}>
                    <img className={cx('img-full')} src={songInfo.thumbnailM} alt={songInfo.alias} />
                </div>
                <div className={cx('info-full')}>
                    <h3 className={cx('title-full')}>{songInfo.title}</h3>
                    <p className={cx('artists-full')}>{songInfo.artistsNames}</p>
                </div>
            </div>
            <div
                className={cx('player', isMouseEnter === false && isFull && 'hide')}
                onMouseEnter={() => setIsMouseEnter(true)}
                onMouseLeave={() => setIsMouseEnter(false)}
            >
                <div className={cx('info')}>
                    <img className={cx('img')} src={songInfo.thumbnail} alt={songInfo.alias} />
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
                                className={cx('control-btn', 'random-btn', isRandom && 'active')}
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
                            <Button
                                className={cx('control-btn', 'loop-btn', isLoop && 'active')}
                                type="circle"
                                onClick={handleLoop}
                            >
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
                        <Button className={cx('option-btn')} type="primary" onClick={() => setIsFull(!isFull)}>
                            {isFull ? <FontAwesomeIcon icon={faCompress} /> : <FontAwesomeIcon icon={faExpand} />}
                        </Button>
                    </div>
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
