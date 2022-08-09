import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './WeekChartItem.module.scss';
import SongItem from '~/layouts/components/SongItem';
import { setRandom, setIsPlay } from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function WeekChartItem({ data, name, onClick }) {
    const dispatch = useDispatch();
    const isPlay = useSelector((state) => state.audio.isPlay);
    const playlistId = useSelector((state) => state.audio.playlistId);
    const miniListItems = data.items.slice(0, 5);

    return (
        <div className={cx('container')}>
            <div className={cx('weekchart-box')}>
                <div className={cx('header')}>
                    <Link className={cx('header-link')} to={data.link} state={{ id: data.playlistId }}>
                        {name}
                    </Link>
                    {isPlay && playlistId === data.playlistId && (
                        <Button
                            className={cx('play-btn')}
                            type="circle"
                            onClick={() => {
                                dispatch(setIsPlay(false));
                            }}
                        >
                            <FontAwesomeIcon icon={faPause} />
                        </Button>
                    )}
                    {playlistId !== data.playlistId && (
                        <Button
                            className={cx('play-btn')}
                            type="circle"
                            onClick={() => {
                                dispatch(setRandom(false));
                                onClick(data.items[0], data.items, data.playlistId);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    )}
                    {!isPlay && playlistId === data.playlistId && (
                        <Button
                            className={cx('play-btn')}
                            type="circle"
                            onClick={() => {
                                dispatch(setIsPlay(true));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    )}
                </div>
                <div className={cx('content')}>
                    {miniListItems.map((miniListItem, index) => (
                        <SongItem
                            serial={true}
                            index={index}
                            type="mini"
                            data={miniListItem}
                            key={index}
                            onClick={() => onClick(miniListItem, data.items, data.sectionId)}
                        />
                    ))}
                </div>
                <div className={cx('handle')}>
                    <Button type="rounded" to={data.link} state={{ id: data.playlistId }}>
                        Xem tất cả
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default WeekChartItem;
