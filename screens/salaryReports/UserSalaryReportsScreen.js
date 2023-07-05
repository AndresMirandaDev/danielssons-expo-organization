import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';

import salaryreportsApi from '../../api/salaryreports';
import useApi from '../../hooks/useApi';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
import AppText from '../../components/AppText';
import SalaryReportListItem from '../../components/SalaryReportListItem';
import ListItemSeparator from '../../components/ListItemSeparator';
import AppDatePicker from '../../components/forms/AppDatePicker';
import AppForm from '../../components/forms/AppForm';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';
import YearMonthPicker from '../../components/forms/YearMonthPicker';
import AppButton from '../../components/AppButton';

const headingText = {
  en: 'salary reports',
  sv: 'lön rapporter',
  es: 'Reportes salariales de',
};

const showAllButtonText = {
  en: 'Show all',
  sv: 'Visa alla',
  es: 'Ver todo',
};
export default function UserSalaryReportsScreen({ route, navigation }) {
  const { language } = useContext(LanguageContext);

  const user = route.params.user;
  const [reports, setReports] = useState(route.params.reports);

  const handleSubmit = ({ date }) => {
    const selectedDate = new Date(date);

    const filteredReports = route.params.reports.filter((report) => {
      const reportDate = new Date(report.date);

      return (
        reportDate.getFullYear() === selectedDate.getFullYear() &&
        reportDate.getMonth() === selectedDate.getMonth()
      );
    });

    setReports(filteredReports);
  };
  return (
    <Screen style={styles.screen}>
      <View style={appStyles.heading}>
        {language === 'en' || language === 'sv' ? (
          <AppText style={appStyles.headingText}>
            {user.name} {headingText[language]}
          </AppText>
        ) : (
          <AppText style={appStyles.headingText}>
            {headingText[language]} {user.name}
          </AppText>
        )}
      </View>
      <AppForm
        initialValues={{
          date: '',
        }}
        onSubmit={handleSubmit}
      >
        <YearMonthPicker name="date" />
      </AppForm>
      <View style={{ backgroundColor: colors.white, padding: 10 }}>
        <AppButton
          title={showAllButtonText[language]}
          onPress={() => {
            setReports(route.params.reports);
          }}
          color="green"
        />
      </View>
      <View style={{ flex: 1, paddingBottom: 50 }}>
        <FlatList
          data={reports}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <SalaryReportListItem
                report={item}
                onPress={() => navigation.navigate('ReportDetailsScreen', item)} // ReportDetailsScreen era anteriormente
              />
            );
          }}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryOpacity,
    minHeight: '100%',
  },
  container: {
    backgroundColor: colors.white,
  },
  headerContainer: {
    backgroundColor: colors.white,
    padding: 20,
  },
  header: {
    fontSize: 25,
    textTransform: 'capitalize',
    color: colors.primaryOpacity,
    fontWeight: 800,
    textAlign: 'center',
  },
});
