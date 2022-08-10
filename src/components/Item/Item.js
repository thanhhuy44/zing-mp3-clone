import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';

const cx = classNames.bind(styles);

function Item({ type, data }) {
    return (
        <div
            key={data.encodeId}
            className={cx('item') + (type === 'topic' ? ' col l-3 m-4 c-6' : ' col l-2-4 m-4 c-6')}
        >
            <div className={cx('item-thumb')}>
                <Link
                    className={cx('item-action')}
                    to={data.link}
                    state={{ id: data.encodeId, onPlay: type === 'topic' ? false : true }}
                >
                    {type === 'topic' ? '' : <FontAwesomeIcon icon={faCirclePlay} />}
                </Link>
                <img src={data.thumbnailM || data.thumbnailR} alt={data.sortDescription} className={cx('item-img')} />
            </div>
            <div className={cx('info', type)}>
                <Link to={data.link} state={{ id: data.encodeId }}>
                    <h3 className={cx('name')}>{data.title}</h3>
                </Link>
                {data.sortDescription && <p className={cx('desc')}>{data.sortDescription}</p>}
            </div>
        </div>
    );
}

export default Item;
