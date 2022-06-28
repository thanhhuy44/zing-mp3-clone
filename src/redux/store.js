import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './features/audioSlice';

export default configureStore({
    reducer: {
        audio: audioReducer,
    },
});
