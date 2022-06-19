import classNames from 'classnames/bind';
import styles from './SlideButton.module.scss';

const cx = classNames.bind(styles);

function NextButton({ className, onClick }) {
    return <div className={cx('next-btn')} onClick={onClick} />;
}

export default NextButton;
