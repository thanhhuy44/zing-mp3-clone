import { useState, useEffect } from 'react';
import request from '~/utils/axios';

import classNames from 'classnames/bind';
import styles from './Top100.module.scss';
import Playlists from '~/layouts/components/Playlists';
import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';

const cx = classNames.bind(styles);

function Top100() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        request.get('/top100').then((res) => {
            setIsLoading(false);
            setData(res.data);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                {data.map((playlist, index) => (
                    <Section key={index}>
                        {playlist.items.map((item) => (
                            <Item key={item.encodeId} data={item} />
                        ))}
                    </Section>
                ))}
            </div>
        );
    }
}

export default Top100;
