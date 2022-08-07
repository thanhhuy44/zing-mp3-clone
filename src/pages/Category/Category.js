import { useState, useEffect } from 'react';
import request from '~/utils/axios';

import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';

const cx = classNames.bind(styles);

function Category() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        request.get('/category').then((res) => {
            setIsLoading(false);
            setData(res.data);
            console.log(res.data);
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                {data.genre.map((section) => (
                    <Section key={section.encodeId} title={section.title}>
                        {section.playlists.map((playlist) => (
                            <Item key={playlist.encodeId} data={playlist} />
                        ))}
                    </Section>
                ))}
            </div>
        );
    }
}

export default Category;
