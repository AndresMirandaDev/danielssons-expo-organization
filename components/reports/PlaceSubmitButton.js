import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';

export default function PlaceSubmitButton() {
  const { handleSubmit, errors, validateForm } = useFormikContext();
  const [submitted, setSubmitted] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    console.log('effect called');
    // Check if there are any errors in the errors object
    const hasFormErrors = Object.keys(errors).length > 0;
    setHasErrors(hasFormErrors);
  }, [errors]);

  const handlePress = async () => {
    if (!submitted) {
      await validateForm(); // Trigger form validation

      const updatedErrors = await validateForm();
      const hasFormErrors = Object.keys(updatedErrors).length > 0; // Check errors again after validation
      setHasErrors(hasFormErrors);

      if (!hasFormErrors) {
        handleSubmit();
        setSubmitted(true);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.icon,
          { backgroundColor: submitted ? colors.green : colors.light },
        ]}
      >
        <MaterialCommunityIcons
          name="check"
          color={submitted ? colors.light : colors.green}
          size={30}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 20,
    borderRadius: 50,
    padding: 10,
  },
});
