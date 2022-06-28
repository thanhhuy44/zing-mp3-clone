import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './NewMusic.module.scss';
import SongItem from '~/layouts/components/SongItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewMusic() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/api/newreleasechart').then((res) => {
            setData(res.data.data.items);
            setIsLoading(false);
        });
    });
    if (isLoading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Mới Phát Hành</h3>
                    <Button className={cx('play-btn')} type="circle">
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                </div>

                <div className={cx('content')}>
                    {data.map((song, index) => (
                        <SongItem serial={true} data={song} index={index} />
                    ))}
                </div>
            </div>
        );
    }
}

export default NewMusic;
