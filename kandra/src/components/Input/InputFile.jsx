import React, { useState, useRef } from "react";
import styles from './InputFile.module.css';

export const InputFile = ({
  label,
  onChange,
  variant = "primary",
  name = "",
  accept = "",
  error = "",
  className = "",
  disabled = false,
  multiple = false,
  required = false,
  buttonText = "Choisir un fichier",
  helperText = "",
  fullWidth = false,
  ...rest
}) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      if (multiple) {
        setFileName(`${files.length} fichier(s) sélectionné(s)`);
      } else {
        setFileName(files[0].name);
      }
    } else {
      setFileName("");
    }
    if (onChange) onChange(e);
  };

  const handleButtonClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getVariantClass = () => {
    const variantMap = {
      primary: styles.buttonPrimary,
      secondary: styles.buttonSecondary,
      danger: styles.buttonDanger,
      outline: styles.buttonOutline,
    };
    return variantMap[variant] || styles.buttonPrimary;
  };

  const variantClass = getVariantClass();
  
  const containerClasses = [
    styles.container,
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          className={`${styles.label} ${disabled ? styles.labelDisabled : ''}`}
          htmlFor={name}
        >
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      
      <div className={`${styles.fileInputContainer} ${error ? styles.containerError : ''}`}>
        <input
          ref={fileInputRef}
          type="file"
          id={name}
          name={name}
          onChange={handleChange}
          accept={accept}
          disabled={disabled}
          multiple={multiple}
          className={styles.hiddenInput}
          required={required}
          {...rest}
        />
        
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled}
            className={`
              ${styles.uploadButton}
              ${variantClass}
              ${disabled ? styles.buttonDisabled : ''}
            `}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
          >
            {buttonText}
          </button>
          
          <div className={styles.fileNameContainer}>
            {fileName ? (
              <span className={`${styles.fileName} ${disabled ? styles.fileNameDisabled : ''}`}>
                {fileName}
              </span>
            ) : (
              <span className={`${styles.noFileText} ${disabled ? styles.noFileTextDisabled : ''}`}>
                Aucun fichier choisi
              </span>
            )}
            {accept && (
              <span className={`${styles.fileAccept} ${disabled ? styles.fileAcceptDisabled : ''}`}>
                {accept}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {error && (
        <span 
          id={`${name}-error`} 
          className={styles.errorMessage}
        >
          {error}
        </span>
      )}
      {!error && helperText && (
        <span 
          id={`${name}-helper`} 
          className={styles.helperText}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default InputFile;