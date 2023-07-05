import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../Screen';
import colors from '../../config/colors';
import AppText from '../AppText';

export default function AppDatePicker({
  name,
  placeholder = 'Select Date',
  mode = 'date',
}) {
  const { setFieldValue, values } = useFormikContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const setDate = (date) => {
    setFieldValue(name, new Date(date));
    setModalVisible(false);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="calendar-clock"
          size={25}
          color={colors.medium}
          style={{ marginRight: 10 }}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AppText style={styles.date}>
            {values[name] ? values[name].toLocaleDateString() : placeholder}
          </AppText>
        </TouchableOpacity>

        {modalVisible && (
          <View>
            <Screen>
              <DateTimePickerModal
                date={currentDate}
                mode="date"
                onConfirm={setDate}
                onCancel={() => setModalVisible(false)}
                isVisible={modalVisible}
              />
            </Screen>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  container: {
    padding: 10,
    backgroundColor: colors.light,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
  },
  date: {
    color: colors.medium,
  },
});
