import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import colors from '../../config/colors';
import AppText from '../AppText';
import { LanguageContext } from '../../language/languageContext';

const totalHoursText = {
  en: 'Total hours',
  sv: 'Summa timmar',
  es: 'Total horas',
};

export default function SubmittedWorkDaysListFooter({ workDays }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const totalHours = workDays.reduce((total, workDay) => {
    const placeHours = workDay.places.reduce(
      (sum, place) => sum + parseInt(place.hours),
      0
    );
    return total + placeHours;
  }, 0);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <AppText style={styles.text}>{totalHoursText[language]}</AppText>
      </View>
      <View>
        <AppText style={styles.totalHours}>{totalHours}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: colors.primaryOpacity,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: colors.light,
  },
  totalHours: {
    color: colors.light,
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
