import React from 'react';
import styles from './FilterContent.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import DateInput from '../../reusables/DateInput/DateInput';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { observer } from 'mobx-react-lite';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import Divider from '../../reusables/Divider/Divider';

export interface FilterContentProps {
  inputFields: InputField<string>[];
  dateFields: DateField<string>[];
  dropdownFields: DropdownField<string>[];
  isCollapsed?: boolean;
}

const FilterContent: React.FC<FilterContentProps> = observer(
  ({ inputFields, dateFields, dropdownFields, isCollapsed = false }) => {
    const inputFieldsDisplay = (
      <div className={styles.subContainer}>
        {inputFields
          .filter((field) => field.label.toLowerCase() !== 'notes')
          .map((field, index) => (
            <TextInput
              key={`input-${index}`}
              label={field.label}
              value={field.value}
              onChange={field.setValue}
              placeholder={field.placeholder}
              aria-label={field.label}
            />
          ))}
      </div>
    );

    const dateFieldsDisplay = (
      <div className={styles.subContainer}>
        {dateFields.map((field, index) => (
          <DateInput
            key={`date-${index}`}
            value={field.value}
            onChange={(date) => field.setValue(date || '')}
            label={field.label}
            aria-label={field.label}
          />
        ))}
      </div>
    );

    const dropdownFieldsDisplay = (
      <div className={styles.subContainer}>
        {dropdownFields.map((field, index) => (
          <Dropdown
            key={`dropdown-${index}`}
            value={field.value}
            onChange={(value) => field.setValue(String(value))}
            options={field.options}
            aria-label={field.label}
            label={field.label}
          />
        ))}
      </div>
    );

    return (
      <div
        className={`${styles.searchContent} ${isCollapsed ? styles.collapsed : ''}`}
      >
        {inputFields.length > 0 && inputFieldsDisplay}
        {inputFields.length > 0 &&
          (dropdownFields.length > 0 || dateFields.length > 0) && <Divider />}
        {dropdownFields.length > 0 && dropdownFieldsDisplay}
        {dropdownFields.length > 0 && <Divider />}
        {dateFields.length > 0 && dateFieldsDisplay}
      </div>
    );
  },
);

export default FilterContent;
