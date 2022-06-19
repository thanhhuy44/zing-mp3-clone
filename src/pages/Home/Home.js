import { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from '~/components/Carousel';
import Playlists from '~/components/Playlists';

function Home() {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFail, setIsFail] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/home?page=1')
            .then((res) => {
                console.log(res.data.data.items);
                setResult(res.data.data.items);
                setIsLoading(false);
            })
            .catch(() => {
                setIsFail(true);
            });
    }, []);
    if (isLoading) {
        return <h1>Dang Load</h1>;
    } else if (isFail) {
        return <h1>Bi Loi</h1>;
    } else {
        return (
            <div>
                <Carousel data={result[0]} />
                <Playlists data={result[3]} />
            </div>
        );
    }
}

export default Home;
