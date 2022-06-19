import classNames from 'classnames/bind';
import styles from './SlideButton.module.scss';

const cx = classNames.bind(styles);

function PrevButton({ className, style, onClick }) {
    return <div className={cx('prev-btn')} onClick={onClick} />;
}

export default PrevButton;
