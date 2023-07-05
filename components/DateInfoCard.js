import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import AppText from './AppText';
import colors from '../config/colors';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import useWeek from '../hooks/useWeek';
import useWeekDay from '../hooks/useWeekDay';
import { LanguageContext } from '../language/languageContext';

const todayText = {
  en: 'Today',
  sv: 'Idag',
  es: 'Hoy',
};

const weekText = {
  en: 'Week',
  sv: 'Vecka',
  es: 'Semana',
};

LocaleConfig.locales['sv'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Söndag',
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
  ],
  dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
  today: 'Idag',
};

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy',
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};

export default function DateInfoCard() {
  const { language, options, updateLanguage } = useContext(LanguageContext);
  const date = new Date();

  const week = useWeek();
  const weekDay = useWeekDay(date);

  LocaleConfig.defaultLocale = language;

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>
        {todayText[language]} {weekDay}
      </AppText>
      <AppText>
        {weekText[language]} {week}
      </AppText>
      <Calendar showWeekNumbers={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    margin: 20,
    shadowOpacity: 0.2,
    shadowColor: colors.dark,
    shadowOffset: { height: 10, width: 10 },
    shadowRadius: 12,
    borderRadius: 20,
    elevation: 12,
  },
  text: {
    fontSize: 20,
    color: colors.medium,
    fontWeight: 'bold',
  },
});
