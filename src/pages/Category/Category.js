import { useState, useEffect } from 'react';
import request from '~/utils/axios';

import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Category() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [topic, setTopic] = useState([]);
    const [isFullList, setIsFullList] = useState(false);
    const [contentBtn, setContentBtn] = useState('Xem tất cả');

    const handleLists = () => {
        if (isFullList) {
            setTopic(data.topic.slice(0, 4));
            setIsFullList(!isFullList);
            setContentBtn('Xem Tất Cả');
        } else {
            setTopic(data.topic);
            setIsFullList(!isFullList);
            setContentBtn('Thu gọn');
        }
    };

    useEffect(() => {
        request.get('/category').then((res) => {
            setIsLoading(false);
            setData(res.data);
            setTopic(res.data.topic.slice(0, 4));
            document.title = 'Thể loại';
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('topic')}>
                    <Section title={'Tâm Trạng Và Hoạt Động'} flex={true}>
                        {topic.map((item) => (
                            <Item key={item.encodeId} data={item} type="topic" />
                        ))}
                    </Section>
                    <Button onClick={handleLists} type="rounded">
                        {contentBtn}
                    </Button>
                </div>
                <div className={cx('genre')}>
                    {data.genre.map((section) => (
                        <Section title={section.title} key={section.encodeId} data={section} btn={true}>
                            {section.playlists.map((playlist) => (
                                <Item key={playlist.encodeId} data={playlist} />
                            ))}
                        </Section>
                    ))}
                </div>
            </div>
        );
    }
}

export default Category;
