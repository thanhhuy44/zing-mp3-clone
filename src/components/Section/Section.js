import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import Item from '../Item';

const cx = classNames.bind(styles);

function Section({ data, children }) {
    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>{data.title || 'Playlist/Album'}</h1>
            <div className={cx('wrapper')}>
                <div className={cx('list')}>
                    {data.items.map((item) => (
                        <Item key={item.encodeId} type="playlist" data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Section;
