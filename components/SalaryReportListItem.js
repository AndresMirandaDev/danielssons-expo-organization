import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';
import { LanguageContext } from '../language/languageContext';
import useMonth from '../hooks/useMonth';

const salaryReportText = {
  en: 'Salary report',
  sv: 'Lön rapport',
  es: 'Reporte salarial',
};

export default function SalaryReportListItem({ report, onPress }) {
  const { language } = useContext(LanguageContext);
  const { date } = report;

  const reportDate = new Date(date);

  const month = useMonth(reportDate);
  const year = reportDate.getFullYear();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={30}
              color={colors.primaryOpacity}
            />
          </View>
          <AppText style={styles.label}>{salaryReportText[language]}</AppText>
          <AppText style={styles.month}>
            {month} {year}
          </AppText>
        </View>
        <View></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,

    padding: 30,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    color: colors.medium,
    fontSize: 21,
    fontStyle: 'italic',
  },
  month: {
    color: colors.primaryOpacity,
    fontSize: 22,
    fontWeight: '800',
  },
});
