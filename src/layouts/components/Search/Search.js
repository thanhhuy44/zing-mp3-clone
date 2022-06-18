import { useState, useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import Button from '~/components/Button';
import { SearchIcon } from '~/components/Icons';
import SearchResult from './SearchResult';
import SearchResultItem from './SearchResultItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        fetch(
            `https://zingmp3.vn/api/v2/page/get/home?page=1&count=30&segmentId=-1&ctime=1655451173&version=1.6.32&sig=e65f1dfcd8d6e8a89f097d4a74d039aadeebfcf8ba49d8d603828ea369a46c477f958215458e79d050280154853500e03a649e9253dc2f9d73ca23779a74bf31&apiKey=88265e23d4284f25963e6eedac8fbfa3`,
        )
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
            });
    }, [searchValue]);

    console.log(searchResult);

    const handleClearInput = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <div>
            <Tippy
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <SearchResult>
                            <h3 className={cx('search-title')}>Kết quả gợi ý</h3>
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                        </SearchResult>
                    </div>
                )}
                interactive
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        className={cx('search-input')}
                        placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear-btn')} onClick={handleClearInput}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    <Button type="text" size="medium" to="/search" className={cx('search-btn')}>
                        <SearchIcon className={cx('search-icon')} />
                    </Button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
