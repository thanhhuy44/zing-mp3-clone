import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Radio.module.scss';
import axios from 'axios';
import Loading from '../Loading';
import RadioChannel from './RadioChannel';

const cx = classNames.bind(styles);

function Radio() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/home?page=5`).then((res) => {
            setData(res.data.data.items[1]);
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div>
                {data.items.map((item) => (
                    <RadioChannel key={item.encodeId} data={item} />
                ))}
            </div>
        );
    }
}

export default Radio;
