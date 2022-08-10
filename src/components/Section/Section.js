import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Section({ title, data, btn, children, flex }) {
    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{title || 'Playlist/Album'}</h3>
                {btn && (
                    <Link to={data.link} state={{ id: data.encodeId }} className={cx('category-link')}>
                        <span className={cx('text')}>Tất cả </span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                )}
            </div>
            <div className={cx('list', flex && 'flex') + ' row'}>{children}</div>
        </div>
    );
}

export default Section;
