import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faMusic, faPlay, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SongItem.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

function SongItem({ serial, data, index, type, className, onClick }) {
    const topClass = (index) => {
        if (index === 0) {
            return 'top-1';
        } else if (index === 1) {
            return 'top-2';
        } else if (index === 2) {
            return 'top-3';
        } else return;
    };

    return data ? (
        <div
            onDoubleClick={onClick}
            className={cx('container', type, data.streamingStatus === 1 ? '' : 'vip', className)}
        >
            <div className={cx('content-left')}>
                {serial && <p className={cx('serial', topClass(index))}>{index + 1}</p>}
                <div className={cx('left-icon')}>
                    {serial ? <FontAwesomeIcon icon={faGripLines} /> : <FontAwesomeIcon icon={faMusic} />}
                </div>
                <div className={cx('avatar')}>
                    <img src={data.thumbnail} alt={data.alias} className={cx('song-img')} />
                    <div onClick={onClick} className={cx('song-play')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
                <div className={cx('info')}>
                    <div className={cx('song-title')}>
                        <span className={cx('name')}>{data.title}</span>
                        {data.streamingStatus === 1 ? (
                            ''
                        ) : (
                            <span className={cx('vip-label')}>
                                <img src={images.vipLabel} alt="vip" />
                            </span>
                        )}
                    </div>
                    <div className={cx('artists')}>
                        {data.artists ? (
                            data.artists.map((artist, index) => (
                                <span key={artist.id}>
                                    <Link to={artist.link} className={cx('singers')} state={{ id: artist.id }}>
                                        {artist.name}
                                    </Link>
                                    {index + 1 === data.artists.length ? '' : ', '}
                                </span>
                            ))
                        ) : (
                            <span className={cx('artists')}>{data.artistsNames}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('content-center')}>
                {data.album ? (
                    <Link className={cx('album')} to={data.album.link} state={{ id: data.album.encodeId }}>
                        {data.album.title}
                    </Link>
                ) : (
                    <></>
                )}
            </div>
            <div className={cx('content-right')}>
                <p className={cx('song-time')}>
                    {Math.floor(data.duration / 60) < 10
                        ? '0' + Math.floor(data.duration / 60)
                        : Math.floor(data.duration / 60)}
                    :{data.duration % 60 < 10 ? '0' + (data.duration % 60) : data.duration % 60}
                </p>
            </div>
        </div>
    ) : (
        <div className={cx('container', type, 'no-content')}>
            <div className={cx('content-left')}>
                <div className={cx('left-icon')}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                </div>
                <div className={cx('info')}>
                    <span>NAME</span>
                </div>
            </div>
            <div className={cx('content-center')}>
                <span>ALBUM</span>
            </div>
            <div className={cx('content-right')}>
                <p className={cx('song-time')}>THỜI GIAN</p>
            </div>
        </div>
    );
}

export default SongItem;
