import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import AppText from '../AppText';
import colors from '../../config/colors';
import { useFormikContext } from 'formik';

const FormCheckbox = ({ children, name }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Checkbox
          value={values[name]}
          onValueChange={() => {
            if (values[name] === '') {
              setFieldValue(name, true);
            }
            setFieldValue(name, !values[name]);
          }}
          color={values[name] ? colors.primaryOpacity : undefined}
          style={styles.checkbox}
        />
        <AppText style={styles.paragraph}>{children}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    color: colors.medium,
  },
  checkbox: {
    margin: 8,
    borderRadius: 5,
  },
});
export default FormCheckbox;
