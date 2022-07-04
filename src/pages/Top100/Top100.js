import { useState, useEffect } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Top100.module.scss';
import Playlists from '~/layouts/components/Playlists';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Top100() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/api/top100').then((res) => {
            setIsLoading(false);
            setData(res.data.data);
        });
    }, []);

    console.log(data);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                {data.map((playlist, index) => (
                    <Playlists key={index} data={playlist} />
                ))}
            </div>
        );
    }
}

export default Top100;
