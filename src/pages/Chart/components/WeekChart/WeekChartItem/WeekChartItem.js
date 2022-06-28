import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './WeekChartItem.module.scss';
import SongItem from '~/layouts/components/SongItem';

const cx = classNames.bind(styles);

function WeekChartItem({ data, name }) {
    const miniListItems = data.items.slice(0, 5);

    return (
        <div className={cx('container')}>
            <div className={cx('weekchart-box')}>
                <div className={cx('header')}>
                    <Link className={cx('header-link')} to={data.link} state={{ id: data.playlistId }}>
                        {name}
                    </Link>
                    <Button type="circle">
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                </div>
                <div className={cx('content')}>
                    {miniListItems.map((miniListItems, index) => (
                        <SongItem serial={true} index={index} type="mini" data={miniListItems} key={index} />
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
