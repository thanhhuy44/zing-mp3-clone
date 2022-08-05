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
        request.get(`/playlist/${id}`).then((res) => {
            setIsLoading(false);
            setData(res.data.song.items);
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
