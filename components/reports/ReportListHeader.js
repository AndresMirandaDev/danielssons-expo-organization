import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import AppText from '../AppText';
import colors from '../../config/colors';
import { LanguageContext } from '../../language/languageContext';

const dateText = {
  en: 'Date',
  sv: 'Datum',
  es: 'Fecha',
};

const weekDayText = {
  en: 'Weekday',
  sv: 'Veckodag',
  es: 'Dia ',
};
const workPlacesText = {
  en: 'Work place',
  sv: 'Arbetsplats',
  es: 'Lugar de trabajo',
};
const hoursText = {
  en: 'Hours',
  sv: 'Timmar',
  es: 'Horas',
};

export default function ReportListHeader() {
  const { language, options, updateLanguage } = useContext(LanguageContext);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <AppText style={styles.text}>{dateText[language]}</AppText>
      </View>
      <View style={styles.infoContainer}>
        <AppText style={styles.text}>{weekDayText[language]}</AppText>
      </View>
      <View style={styles.infoContainer}>
        <AppText style={styles.text}>{workPlacesText[language]}</AppText>
      </View>
      <View style={styles.infoContainer}>
        <AppText style={styles.text}>{hoursText[language]}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: colors.primaryOpacity,
    justifyContent: 'space-evenly',
  },
  infoContainer: {},
  text: {
    color: colors.light,
  },
});
