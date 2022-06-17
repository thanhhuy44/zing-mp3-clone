import classNames from 'classnames/bind';
import styles from './Player.module.scss';

const cx = classNames.bind(styles);

function Player() {
    return (
        <div className={cx('wrapper')}>
            <h1>This is Player Component</h1>
        </div>
    );
}

export default Player;
