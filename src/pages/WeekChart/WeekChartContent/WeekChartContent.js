import request from '~/utils/axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SongItem from '~/layouts/components/SongItem';
import Loading from '~/pages/Loading';

function WeekChartContent() {
    const location = useLocation();
    const { id } = location.state;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        request.get(`/playlist/${id}`).then((res) => {
            setData(res.data.song.items);
            setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div>
                {data.map((song, index) => (
                    <SongItem serial={true} data={song} index={index} />
                ))}
            </div>
        );
    }
}

export default WeekChartContent;
