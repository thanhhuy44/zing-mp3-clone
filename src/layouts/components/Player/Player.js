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
import classNames from 'classnames/bind';
import styles from './Player.module.scss';
import Button from '~/components/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
    setInfoSongPlayer,
    setCurrentTime,
    setDuration,
    setSrcAudio,
    setIsPlay,
    setPlaylistSong,
    setSongId,
    setCurrnetIndexPlaylist,
    setPrevSong,
    setRandom,
    setLoop,
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
    const isLyric = useSelector((state) => state.audio.isLyric);
    const currnetIndexPlaylist = useSelector((state) => state.audio.currnetIndexPlaylist);
    const playlistSong = [...useSelector((state) => state.audio.playlistSong)];
    const currentTime = useSelector((state) => state.audio.currentTime);
    const prevSong = [...useSelector((state) => state.audio.prevSong)];
    const playlistId = useSelector((state) => state.audio.playlistId);
    const audioRef = useRef();

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

    const handleOnEnd = () => {
        if (!isLoop) {
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
            console.log(prevSong);
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
        console.log(prevSong);
    };

    const handlePrevSong = () => {
        if (audioRef.current.currentTime <= 5) {
            audioRef.current.currentTime = 0;
            dispatch(setIsPlay(true));
        } else {
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
                prevSong.shift();
                dispatch(setPrevSong(prevSong));
            }
        }
    };

    useEffect(() => {
        if (currentSongId !== null && currentSongId !== '') {
            axios.get(`http://localhost:3001/api/song?id=${currentSongId}`).then((res) => {
                dispatch(setSrcAudio(res.data.data[128]));
            });
        }
    }, [currentSongId, dispatch]);

    return (
        srcAudio && (
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <img className={cx('img')} src={songInfo.thumbnailM} alt={songInfo.alias} />
                    <div className={cx('name')}>
                        <h3 className={cx('title')}>{songInfo.title}</h3>
                        <p className={cx('artists')}>{songInfo.artistsNames}</p>
                    </div>
                </div>
                <div className={cx('control')}>
                    <div className={cx('handler')}>
                        <Button className={cx('control-btn')} type="circle">
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
                </div>
                <div className={cx('option')}>
                    <div className={cx('volume')}>
                        <Button className={cx('option-btn')} type="primary">
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        </Button>
                        <input type="range" className="volume-progress" />
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
            </div>
        )
    );
}

export default Player;
