import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Chart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import LineChart from './components/LineChart';
import ChartSongs from './components/ChartSongs';
import WeekChart from './components/WeekChart';

const cx = classNames.bind(styles);

function Chart() {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/charthome').then((res) => {
            setIsLoading(false);
            setResult(res.data.data);
        });
    }, []);
    if (isLoading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>#zingchart</h1>
                    <button className={cx('play-btn')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                </div>
                <LineChart datas={result} />
                <ChartSongs data={result} />
                <WeekChart data={result.weekChart} />
            </div>
        );
    }
}

export default Chart;
