// APP/client/src/admin/components/SearchInput.jsx

import { useState, useEffect, useRef } from "react";
import { HiSearch, HiX } from "react-icons/hi";

/**
 * Debounced Search Input
 *
 * @param {string}   value       - Controlled value
 * @param {Function} onChange    - Change handler (debounced)
 * @param {string}   placeholder - Input placeholder
 * @param {number}   delay       - Debounce delay in ms (default 300)
 */
const SearchInput = ({ value = "", onChange, placeholder = "Search...", delay = 300 }) => {
    const [local, setLocal] = useState(value);
    const timerRef = useRef(null);

    useEffect(() => {
        setLocal(value);
    }, [value]);

    const handleChange = (e) => {
        const val = e.target.value;
        setLocal(val);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => onChange(val), delay);
    };

    const handleClear = () => {
        setLocal("");
        clearTimeout(timerRef.current);
        onChange("");
    };

    return (
        <div className="admin-search">
            <HiSearch className="admin-search__icon" />
            <input
                type="text"
                className="admin-search__input"
                placeholder={placeholder}
                value={local}
                onChange={handleChange}
                aria-label="Search"
            />
            {local && (
                <button className="admin-search__clear" onClick={handleClear} aria-label="Clear search">
                    <HiX />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
