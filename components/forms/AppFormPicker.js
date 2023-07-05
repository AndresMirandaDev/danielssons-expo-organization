import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppPicker from '../AppPicker';
import { useFormikContext } from 'formik';
import ErrorMessage from '../ErrorMessage';

export default function AppFormPicker({
  items,
  name,
  numberOfColumns,
  placeholder,
  PickerItemComponent,
  width,
  icon,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        icon={icon}
        items={items}
        nummberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        PickerItemComponent={PickerItemComponent}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched} />
    </>
  );
}
