import { useState, useEffect } from 'react';
import request from '~/utils/axios';
import Loading from '../Loading';
import RadioChannel from './RadioChannel';

function Radio() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        request.get(`/radio`).then((res) => {
            setData(res.data.items[0]);
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
