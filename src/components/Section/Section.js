import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import Item from '../Item';

const cx = classNames.bind(styles);

function Section({ title, children }) {
    return (
        <div className={cx('wrapper') + ' grid'}>
            <h1 className={cx('title')}>{title || 'Playlist/Album'}</h1>
            <div className={cx('list') + ' row'}>{children}</div>
        </div>
    );
}

export default Section;
