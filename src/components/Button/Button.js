import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button(props) {
    const { type, size, disable, to, href, className, onClick, leftIcon, rightIcon, ...passProps } = props;
    const handle = { onClick, ...passProps };
    let Comp = 'button';

    const classes = cx('wrapper', type, size, { disable }, className);

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof handle[key] === 'function') {
                delete handle[key];
            }
        });
    }

    if (to) {
        Comp = Link;
        handle.to = to;
    } else if (href) {
        Comp = 'a';
        handle.href = href;
    }

    return (
        <Comp className={classes} {...handle}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{props.children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
