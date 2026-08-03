// APP/client/src/admin/components/FilterDropdown.jsx

import { useState, useRef, useEffect } from "react";
import { HiFilter, HiChevronDown } from "react-icons/hi";

/**
 * Filter Dropdown
 *
 * @param {string}   label     - Dropdown label
 * @param {Array}    options   - [{value, label}]
 * @param {string}   value     - Current selected value
 * @param {Function} onChange  - Selection handler
 * @param {string}   allLabel  - Label for "all" option (default "All")
 */
const FilterDropdown = ({ label, options = [], value, onChange, allLabel = "All" }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = value
        ? options.find((o) => o.value === value)?.label || value
        : allLabel;

    return (
        <div className="admin-filter" ref={ref}>
            <button
                className={`admin-filter__trigger ${value ? "admin-filter__trigger--active" : ""}`}
                onClick={() => setOpen(!open)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <HiFilter size={14} />
                <span>{label}: {selectedLabel}</span>
                <HiChevronDown size={14} />
            </button>
            {open && (
                <div className="admin-filter__menu" role="listbox" aria-label={label}>
                    <button
                        className={`admin-filter__option ${!value ? "admin-filter__option--active" : ""}`}
                        onClick={() => { onChange(""); setOpen(false); }}
                        role="option"
                        aria-selected={!value}
                    >
                        {allLabel}
                    </button>
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            className={`admin-filter__option ${value === opt.value ? "admin-filter__option--active" : ""}`}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            role="option"
                            aria-selected={value === opt.value}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
