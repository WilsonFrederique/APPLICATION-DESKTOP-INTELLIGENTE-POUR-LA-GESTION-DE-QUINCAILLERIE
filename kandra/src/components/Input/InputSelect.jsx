// InputSelect.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from './InputSelect.module.css';

export const InputSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Sélectionner...",
  className = "",
  error = "",
  searchable = false,
  multiple = false,
  disabled = false,
  icon,
  required = false,
  fullWidth = false,
  size = "medium",
  variant = "default",
  helperText = "", // Ajouter explicitement helperText dans les props
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const searchInputRef = useRef(null);

  // Filtrer les props qui ne doivent pas aller sur les éléments enfants
  const filteredProps = { ...rest };
  delete filteredProps.helperText; // Supprimer helperText

  const selectedValues = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value;
    } else {
      return value ? [value] : [];
    }
  }, [value, multiple]);

  const getSizeClass = () => {
    switch(size) {
      case 'small': return styles.sizeSmall;
      case 'large': return styles.sizeLarge;
      default: return '';
    }
  };

  const getVariantClass = () => {
    switch(variant) {
      case 'outline': return styles.variantOutline;
      case 'ghost': return styles.variantGhost;
      default: return '';
    }
  };

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (val) => {
    if (disabled) return;
    
    if (multiple) {
      const exists = selectedValues.includes(val);
      const newValue = exists
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      
      onChange?.(newValue);
    } else {
      onChange?.(val);
      setIsOpen(false);
      setSearch("");
    }
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    if (multiple) {
      onChange?.([]);
    } else {
      onChange?.("");
    }
  };

  const removeValue = (e, val) => {
    e.stopPropagation();
    if (multiple) {
      const newValue = selectedValues.filter((v) => v !== val);
      onChange?.(newValue);
    }
  };

  const isSelected = (val) => selectedValues.includes(val);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const getDisplayValue = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
      
      const selectedOptions = options.filter((opt) => 
        selectedValues.includes(opt.value)
      );
      
      if (selectedOptions.length > 2) {
        return `${selectedOptions.length} sélectionnés`;
      }
      
      return selectedOptions.map((opt) => opt.label).join(", ");
    } else {
      const opt = options.find((o) => o.value === value);
      return opt?.label || placeholder;
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearch("");
      }
    }
  };

  const displayTags = useMemo(() => {
    if (!multiple || selectedValues.length === 0) return [];
    
    const filtered = options.filter(opt => selectedValues.includes(opt.value));
    return filtered.slice(0, 2);
  }, [selectedValues, options, multiple]);

  const showTagCount = useMemo(() => {
    return multiple && selectedValues.length > 2;
  }, [multiple, selectedValues.length]);

  const containerClasses = [
    styles.selectContainer,
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    styles.selectTrigger,
    error ? styles.selectError : '',
    disabled ? styles.selectDisabled : '',
    isOpen ? styles.selectOpen : '',
    icon ? styles.withIcon : '',
    getSizeClass(),
    getVariantClass()
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={ref}>
      {label && (
        <label className={styles.selectLabel}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {icon && <div className={styles.iconLeft}>{icon}</div>}
        
        <div
          className={triggerClasses}
          onClick={handleToggle}
          {...filteredProps} // Utiliser les props filtrées
        >
          <div className={styles.selectValue}>
            {multiple && selectedValues.length > 0 && (
              <div className={styles.selectedTags}>
                {displayTags.map(opt => (
                  <span key={opt.value} className={styles.tag}>
                    {opt.label}
                    {!showTagCount && (
                      <button
                        type="button"
                        onClick={(e) => removeValue(e, opt.value)}
                        className={styles.tagRemove}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {showTagCount && (
                  <span className={styles.tagCount}>
                    +{selectedValues.length - 2}
                  </span>
                )}
              </div>
            )}
            
            {(!multiple || selectedValues.length === 0) && (
              <span className={selectedValues.length > 0 ? styles.selectedText : styles.placeholder}>
                {getDisplayValue()}
              </span>
            )}
          </div>
          
          <div className={styles.selectIcons}>
            {selectedValues.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className={styles.clearButton}
                disabled={disabled}
                aria-label="Effacer la sélection"
              >
                ×
              </button>
            )}
            <svg
              className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {isOpen && !disabled && (
          <div className={styles.selectDropdown}>
            {searchable && (
              <div className={styles.searchContainer}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className={styles.searchInput}
                />
              </div>
            )}
            
            <div className={styles.optionsContainer}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => !opt.disabled && toggleOption(opt.value)}
                    className={`
                      ${styles.option}
                      ${isSelected(opt.value) ? styles.optionSelected : ''}
                      ${opt.disabled ? styles.optionDisabled : ''}
                    `}
                    role="option"
                    aria-selected={isSelected(opt.value)}
                    aria-disabled={opt.disabled}
                  >
                    {multiple ? (
                      <>
                        <span className={`
                          ${styles.checkbox}
                          ${isSelected(opt.value) ? styles.checkboxChecked : ''}
                          ${opt.disabled ? styles.checkboxDisabled : ''}
                        `}>
                          {isSelected(opt.value) && (
                            <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10 2L4.5 7.5L2 5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span className={styles.optionLabel}>{opt.label}</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.optionLabel}>{opt.label}</span>
                        {isSelected(opt.value) && (
                          <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  Aucun résultat trouvé
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
      {!error && helperText && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default InputSelect;