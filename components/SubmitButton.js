import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppButton from './AppButton';
import { useFormikContext } from 'formik';

export default function SubmitButton({ title, color }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton color={color} title={title} onPress={handleSubmit} />;
}
