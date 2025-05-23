import React, { useEffect } from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addMeasurementStore from '../../../stores/derived/AddMeasurementStore/AddMeasurementStore';
import styles from './AddMeasurementPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import DateInput, { DateInputProps } from '../../reusables/DateInput/DateInput';
import TextArea from '../../reusables/TextArea/TextArea';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import Divider from '../../reusables/Divider/Divider';
import measurementsStore from '../../../stores/derived/MeasurementsStore/MeasurementsStore';
import { useTranslation } from 'react-i18next';

interface AddMeasurementPageProps {
  isEditing?: boolean;
}

const AddMeasurementPage: React.FC<AddMeasurementPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    useEffect(() => {
      if (isEditing && id) {
        addMeasurementStore.loadReading(id);
      } else {
        addMeasurementStore.resetForm();
      }
    }, [isEditing, id]);

    const handleSubmit = (e: React.FormEvent) => {
      if (!addMeasurementStore.validateForm()) return;

      e.preventDefault();

      if (isEditing && id) {
        addMeasurementStore.updateReading(id);
      } else {
        addMeasurementStore.addReading();
      }

      addMeasurementStore.resetForm();
      navigate('/measurementsPage');
    };

    const createTextInputFieldModel = (fieldKey: string): TextInputProps => ({
      ...addMeasurementStore.inputFields[fieldKey],
      value: String(addMeasurementStore.inputFields[fieldKey].value || ''),
      onChange: (value: string) =>
        addMeasurementStore.inputFields[fieldKey].setValue(value),
    });

    const createDropdownFieldModel = (fieldKey: string) => ({
      ...addMeasurementStore.dropdownFields[fieldKey],
      value: String(addMeasurementStore.dropdownFields[fieldKey].value),
      options: measurementsStore.dropdownFilters[fieldKey]?.options || [],
      onChange: (value: string | number) =>
        addMeasurementStore.dropdownFields[fieldKey].setValue(String(value)),
    });

    const createDateFieldModel = (fieldKey: string): DateInputProps => ({
      ...addMeasurementStore.dateFields[fieldKey],
      value: String(addMeasurementStore.dateFields[fieldKey].value || ''),
      onChange: (value) =>
        addMeasurementStore.dateFields[fieldKey].setValue(value || ''),
    });

    const nameProps = createTextInputFieldModel('title');
    const notesProps = createTextInputFieldModel('notes');
    const soilPHProps = createTextInputFieldModel('soilPH');
    const batchIdProps = createTextInputFieldModel('batchId');
    const soilDrynessProps = createDropdownFieldModel('soilDryness');
    const growthStageProps = createDropdownFieldModel('growthStage');
    const healthStatusProps = createDropdownFieldModel('healthStatus');
    const dateProps = createDateFieldModel('date');

    const buttonContainerData: ButtonProps[] = [
      {
        type: 'button',
        onClick: () => navigate('/measurementsPage'),
        label: t('addMeasurementPage.buttons.back'),
      },
      {
        type: 'submit',
        label: isEditing
          ? t('addMeasurementPage.buttons.editReading')
          : t('addMeasurementPage.buttons.addReading'),
        customStyles: { marginTop: '1rem' },
      },
    ];

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addMeasurementStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...nameProps} />
            <TextInput {...batchIdProps} />
            <TextArea {...notesProps} />
            <TextInput {...soilPHProps} />
            <Divider />
            <Dropdown {...soilDrynessProps} />
            <Dropdown {...growthStageProps} />
            <Dropdown {...healthStatusProps} />
            <Divider />
            <DateInput {...dateProps} />
            <ButtonContainer
              customStyles={{ gridColumn: '1 / -1' }}
              buttons={buttonContainerData}
            />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddMeasurementPage;
