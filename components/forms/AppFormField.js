import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from '../ErrorMessage';
import AppTextInput from './AppTextInput';

export default function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => {
          setFieldTouched(name);
        }}
        onChangeText={(text) => {
          setFieldValue(name, text);
        }}
        value={values[name]}
        {...otherProps}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
