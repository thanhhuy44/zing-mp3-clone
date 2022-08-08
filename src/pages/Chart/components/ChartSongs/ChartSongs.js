import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChartSongs.module.scss';

import SongItem from '~/layouts/components/SongItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ChartSongs({ data, onClick }) {
    const [topSongs, setTopSongs] = useState(data.RTChart.items.slice(0, 10));
    const [isFullList, setIsFullList] = useState(false);
    const [contentBtn, setContentBtn] = useState('Xem Tất Cả');

    const handleLists = () => {
        if (isFullList) {
            setTopSongs(data.RTChart.items.slice(0, 10));
            setIsFullList(!isFullList);
            setContentBtn('Xem Tất Cả');
        } else {
            setTopSongs(data.RTChart.items);
            setIsFullList(!isFullList);
            setContentBtn('Thu gọn');
        }
    };

    return (
        <div className={cx('container')}>
            {topSongs.map((song, index) => (
                <SongItem
                    key={index}
                    serial={true}
                    data={song}
                    index={index}
                    onClick={() => onClick(song, data.RTChart)}
                />
            ))}
            <div className={cx('option-btn')}>
                <Button type="rounded" onClick={handleLists}>
                    {contentBtn}
                </Button>
            </div>
        </div>
    );
}

export default ChartSongs;
