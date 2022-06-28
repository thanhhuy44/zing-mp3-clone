import { Container, Row, Col } from 'react-bootstrap';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import classNames from 'classnames/bind';
import styles from './Playlists.module.scss';
import PlaylistItem from './PlaylistItem';

const cx = classNames.bind(styles);

function Playlists({ data }) {
    const playlists = data.items;

    return (
        <Container className={cx('container')}>
            <h1 className={cx('title')}>{data.title}</h1>
            <div className={cx('wrapper')}>
                <Row className={cx('list')}>
                    {playlists.map((playlist) => (
                        <PlaylistItem key={playlist.encodeId} playlist={playlist} />
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default Playlists;
