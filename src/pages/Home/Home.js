import { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from '~/layouts/components/Carousel';
import Playlists from '~/layouts/components/Playlists';

import Loading from '../Loading';

function Home() {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFail, setIsFail] = useState(false);

    useEffect(() => {
        let dataHome = [];
        for (var i = 1; i <= 5; i++) {
            axios
                .get(`http://localhost:3001/api/home?page=${i}`)
                .then((res) => {
                    for (var j = 0; j < res.data.data.items.length; j++) {
                        dataHome.push(res.data.data.items[j]);
                    }
                })
                .catch(() => {
                    setIsFail(true);
                });
            if (i === 5) {
                setTimeout(function () {
                    setResult(dataHome);
                    setIsLoading(false);
                }, 500);
            }
        }
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
