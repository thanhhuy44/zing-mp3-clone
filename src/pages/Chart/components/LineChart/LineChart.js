import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';

import classNames from 'classnames/bind';
import styles from './LineChart.module.scss';

const cx = classNames.bind(styles);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

function LineChart({ datas }) {
    const chartData = datas.RTChart.chart;
    const topSongId = Object.keys(chartData.items);

    const [labels, setLabels] = useState([]);
    const getLabelsTime = () => {
        chartData.times.map((time) => {
            if (labels.length >= 24) {
                return;
            } else {
                labels.push(`${time.hour}:00`);
            }
        });
    };
    getLabelsTime();
    const getSongScore = (id) => {
        return chartData.items[id].map((score) => score.counter);
    };

    const data = {
        labels,
        datasets: [
            {
                data: getSongScore(topSongId[0]),
                borderColor: '#4a90e2',
                backgroundColor: '#4a90e2',
            },
            {
                data: getSongScore(topSongId[1]),
                borderColor: '#27bd9c',
                backgroundColor: '#27bd9c',
            },
            {
                data: getSongScore(topSongId[2]),
                borderColor: '#e35050',
                backgroundColor: '#e35050',
            },
        ],
    };
    return (
        <div className={cx('chart')}>
            <Line data={data} />
        </div>
    );
}

export default LineChart;
