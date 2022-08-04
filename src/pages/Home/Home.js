import { useState, useEffect } from 'react';
import request from '~/utils/axios';

import Carousel from '~/layouts/components/Carousel';
import Playlists from '~/layouts/components/Playlists';

import Loading from '../Loading';

function Home() {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFail, setIsFail] = useState(false);

    useEffect(() => {
        request.get('/home').then((res) => {
            setIsLoading(false);
            setResult(res.data.items);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else if (isFail) {
        return <h1>Bi Loi</h1>;
    } else {
        return (
            <div>
                <Carousel data={result[0]} />
                {result.map(
                    (playlist, index) =>
                        playlist.sectionType === 'playlist' && <Playlists key={index} data={playlist} />,
                )}
            </div>
        );
    }
}

export default Home;
