import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../AppText';
import AppButton from '../AppButton';
import Screen from '../Screen';
import colors from '../../config/colors';
import { LanguageContext } from '../../language/languageContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useFormikContext } from 'formik';
import { date } from 'yup';

const placeholderText = {
  en: 'Select year and month',
  sv: 'Välj år och månad',
  es: 'Escoge año y mes',
};

export default function YearMonthPicker({ name }) {
  const { language } = useContext(LanguageContext);
  const { values, setFieldValue, handleSubmit } = useFormikContext();

  const [modalVisible, setModalVisible] = useState(false);
  const currentDate = new Date();

  const handleChange = (date) => {
    const parts = date.split(' ');
    const year = parts[0];
    const month = parts[1] - 1;

    const dateObject = new Date(year, month);

    setFieldValue(name, dateObject);
  };
  return (
    <Screen style={styles.screen}>
      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
          setFieldValue(name, currentDate);
        }}
        underlayColor={colors.light}
      >
        <View style={styles.placeholderContainer}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="calendar"
              size={25}
              color={colors.medium}
            />
          </View>
          <AppText style={styles.placeholder}>
            {placeholderText[language]}
          </AppText>
        </View>
      </TouchableHighlight>
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.container}>
          <View>
            <DatePicker
              mode="monthYear"
              onMonthYearChange={handleChange}
              options={{ mainColor: colors.primaryOpacity }}
            />
            <View style={{ padding: 10 }}>
              <AppButton
                title="search"
                color="primaryOpacity"
                onPress={() => {
                  handleSubmit();
                  setModalVisible(false);
                }}
              />
              <AppButton
                title="close"
                color="danger"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    padding: 10,
  },
  placeholderContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: colors.primaryOpacity,
  },
  icon: {
    marginRight: 10,
  },
});
