import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SongItem from '~/layouts/components/SongItem';

function WeekChartContent() {
    const location = useLocation();
    const { id } = location.state;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/detailplaylist?id=${id}`).then((res) => {
            setData(res.data.data.song.items);
        });
    }, [id]);

    return (
        <div>
            {data.map((song, index) => (
                <SongItem serial={true} data={song} index={index} />
            ))}
        </div>
    );
}

export default WeekChartContent;
