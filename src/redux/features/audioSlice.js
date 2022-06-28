import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isPlay: false,
    isMute: false,
    songId: localStorage.getItem('songId'),
    playlistId: '',
    currnetIndexPlaylist: 0,
    infoSongPlayer: localStorage.getItem('songInfo'),
    srcAudio: '',
    currentTime: 0,
    duration: 0,
    volume: Number(localStorage.getItem('volume')) || 0.5,
    isLoop: false,
    isRandom: true,
    autoPlay: false,
    playlistSong: [],
    prevSong: [],
    isLyric: false,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setIsPlay: (state, action) => {
            state.isPlay = action.payload;
        },
        changeIconVolume: (state, action) => {
            state.isMute = action.payload;
        },
        setSongId: (state, action) => {
            state.songId = action.payload;
            localStorage.setItem('songId', action.payload);
        },
        setPlaylistId: (state, action) => {
            state.playlistId = action.payload;
        },
        setInfoSongPlayer: (state, action) => {
            state.infoSongPlayer = { ...action.payload };
            localStorage.setItem('songInfo', JSON.stringify({ ...action.payload }));
        },
        setSrcAudio: (state, action) => {
            state.srcAudio = action.payload;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setLoop: (state, action) => {
            state.isLoop = action.payload;
        },
        setAutoPlay: (state, action) => {
            state.autoPlay = action.payload;
        },
        setPlaylistSong: (state, action) => {
            state.playlistSong = action.payload;
        },
        setCurrnetIndexPlaylist: (state, action) => {
            state.currnetIndexPlaylist = action.payload;
        },
        setOpenLyric: (state, action) => {
            state.isLyric = action.payload;
        },
        setPrevSong: (state, action) => {
            state.prevSong = action.payload;
        },
        setRandom: (state, action) => {
            state.isRandom = action.payload;
        },
    },
});

export const {
    setIsPlay,
    changeIconVolume,
    setSongId,
    setInfoSongPlayer,
    setCurrentTime,
    setDuration,
    setVolume,
    setLoop,
    setSrcAudio,
    setAutoPlay,
    setPlaylistSong,
    setCurrnetIndexPlaylist,
    setOpenLyric,
    setRandom,
    setPrevSong,
    setPlaylistId,
} = audioSlice.actions;
export default audioSlice.reducer;
