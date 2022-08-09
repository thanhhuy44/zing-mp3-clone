import request from '~/utils/axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SongItem from '~/layouts/components/SongItem';
import Loading from '~/pages/Loading';
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
} from '~/redux/features/audioSlice';

function WeekChartContent() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = location.state;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const isRandom = useSelector((state) => state.audio.isRandom);

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
        setIsLoading(true);

        request.get(`/playlist/${id}`).then((res) => {
            setData(res.data.song.items);
            setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div>
                {data.map((song, index) => (
                    <SongItem
                        serial={true}
                        data={song}
                        index={index}
                        onClick={() => {
                            handlePlaySong(song, data, id);
                        }}
                    />
                ))}
            </div>
        );
    }
}

export default WeekChartContent;
