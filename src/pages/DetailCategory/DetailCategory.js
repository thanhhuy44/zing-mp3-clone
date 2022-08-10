import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import request from '~/utils/axios';
import Loading from '../Loading';

import classNames from 'classnames/bind';
import styles from './DetailCategory.module.scss';
import Section from '~/components/Section';
import Item from '~/components/Item';

const cx = classNames.bind(styles);

function DetailCategory() {
    const location = useLocation();
    const { id } = location.state;
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        request.get(`/category/${id}`).then((res) => {
            setData(res.data);
            setIsLoading(false);
            console.log(res.data);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('banner')}>
                    <img className={cx('banner-img')} src={data.cover} alt={data.link} />
                </div>
                <div className={cx('section')}>
                    {data.sections.map(
                        (section) =>
                            section.sectionType === 'playlist' && (
                                <Section key={section.title} title={section.title}>
                                    {section.items.map((item) => (
                                        <Item key={item.encodeId} data={item} />
                                    ))}
                                </Section>
                            ),
                    )}
                </div>
            </div>
        );
    }
}

export default DetailCategory;
