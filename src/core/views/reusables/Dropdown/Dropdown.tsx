import React from 'react';
import styles from './Dropdown.module.css';
import { DropdownOption } from '../../../../auxiliary/interfaces/DropdownOptions';
import EventBus from '../../../services/EventBusService/EventBusService';

export interface DropdownProps {
  value: string;
  onChange: (value: number | string) => void;
  options: DropdownOption[];
  ariaLabel?: string;
  label?: string;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  ariaLabel,
  label,
  required,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);

    EventBus.dispatchEvent(`dropdownFilters:updated`, undefined);
  };

  return (
    <div className={label ? styles.container : ''}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
          {required && <span className={styles.requiredIndicator}>*</span>}
        </label>
      )}
      <select
        required={required}
        value={value}
        onChange={handleChange}
        className={styles.dropdown}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
