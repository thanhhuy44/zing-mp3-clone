import { useEffect, useState } from 'react';
import request from '~/utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './NewMusic.module.scss';
import SongItem from '~/layouts/components/SongItem';
import Button from '~/components/Button';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function NewMusic() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        request.get('/chart/new-release').then((res) => {
            setData(res.data);
            setIsLoading(false);
            document.title = res.data.title;
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>{data.title}</h3>
                    <Button className={cx('play-btn')} type="circle">
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                </div>

                <div className={cx('content')}>
                    {data.items.map((song, index) => (
                        <SongItem serial={true} data={song} index={index} />
                    ))}
                </div>
            </div>
        );
    }
}

export default NewMusic;
