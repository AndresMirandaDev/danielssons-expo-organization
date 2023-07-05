import { useContext } from 'react';
import { LanguageContext } from '../language/languageContext';

const months = {
  en: {
    1: 'January',
    2: 'February',
    3: 'Mars',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  },
  sv: {
    1: 'Januari',
    2: 'Februari',
    3: 'Mars',
    4: 'April',
    5: 'Maj',
    6: 'Juni',
    7: 'Juli',
    8: 'Augusti',
    9: 'September',
    10: 'Oktober',
    11: 'November',
    12: 'December',
  },
  es: {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  },
};

export default function useMonth(date) {
  const newDate = new Date(date);
  const { language } = useContext(LanguageContext);

  return months[language][newDate.getMonth() + 1];
}
