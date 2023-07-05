import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppButton from '../AppButton';
import { useFormikContext } from 'formik';

export default function FormResetButton({ title, color }) {
  const { resetForm } = useFormikContext();

  return <AppButton title={title} color={color} onPress={() => resetForm()} />;
}

const styles = StyleSheet.create({});
