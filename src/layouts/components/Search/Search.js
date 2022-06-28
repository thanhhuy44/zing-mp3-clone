import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import Button from '~/components/Button';
import { SearchIcon } from '~/components/Icons';
import SearchResult from './SearchResult';
import SearchResultItem from './SearchResultItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [disableBtn, setDisableBtn] = useState(true);

    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        axios
            .get(`http://localhost:3001/api/search`, {
                params: {
                    keyword: debounced,
                },
            })
            .then((res) => {
                setSearchResult(res.data.data.songs || []);
            });
    }, [debounced]);

    const handleChangeInput = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value === '' || !e.target.value.trim()) {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    };

    const handleClearInput = () => {
        setSearchValue('');
        setDisableBtn(true);
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSearchClick = () => {
        localStorage.setItem('searchKeyWord', inputRef.current.value);
        setSearchValue(inputRef.current.value);
    };

    return (
        <div>
            <Tippy
                visible={showResult && searchResults.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <SearchResult>
                            <h3 className={cx('search-title')}>Kết quả gợi ý</h3>
                            {searchResults.map((searchResult) => (
                                <SearchResultItem key={searchResult.encodeId} data={searchResult} />
                            ))}
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
                        onChange={handleChangeInput}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear-btn')} onClick={handleClearInput}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    <Button
                        disable={disableBtn}
                        type="text"
                        size="medium"
                        to={`/search/${searchValue}`}
                        state={{ keyword: searchValue }}
                        className={cx('search-btn')}
                        onClick={handleSearchClick}
                    >
                        <SearchIcon className={cx('search-icon')} />
                    </Button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
