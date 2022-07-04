import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import images from '~/assets';
import styles from './Radio.module.scss';
import {
    setInfoSongPlayer,
    setIsPlay,
    setIsRadioPlay,
    setPlaylistSong,
    setSrcRadio,
} from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function RadioChannel({ data }) {
    const dispatch = useDispatch();
    const handlePlayRadio = (data) => {
        dispatch(setSrcRadio(data.streaming));
        dispatch(setInfoSongPlayer(data));
        dispatch(setIsRadioPlay(true));
        dispatch(setIsPlay(false));
        dispatch(setPlaylistSong([]));
    };

    return (
        <div className={cx('container')}>
            <img src={data.thumbnailH} className={cx('channel-bg')} alt={data.program.title} />
            <div className={cx('content')}>
                <div className={cx('avatar')}>
                    <div className={cx('thumb')}>
                        <img src={data.thumbnailM} alt={data.description} />
                        <img src={images.liveLabel} className={cx('label')} alt="label" />
                    </div>
                    <div className={cx('action')} onClick={() => handlePlayRadio(data)}>
                        <FontAwesomeIcon icon={faPlayCircle} />
                    </div>
                </div>
                <div className={cx('info')}>
                    <h2 className={cx('name')}>{data.title}</h2>
                    <p className={cx('listening')}>{data.activeUsers} Nguoi dang nghe</p>
                </div>
            </div>
        </div>
    );
}

export default RadioChannel;
