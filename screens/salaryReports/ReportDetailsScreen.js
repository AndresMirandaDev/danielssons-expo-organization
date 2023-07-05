import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import Screen from '../../components/Screen';
import colors from '../../config/colors';
import AppText from '../../components/AppText';
import useMonth from '../../hooks/useMonth';
import WorkDayListItem from '../../components/reports/WorkDayListItem';
import ListItemSeparator from '../../components/ListItemSeparator';
import ReportListHeader from '../../components/reports/ReportListHeader';
import ReportListFooter from '../../components/reports/ReportListFooter';
import { LanguageContext } from '../../language/languageContext';

const headingText = {
  en: 'salary report for',
  sv: 'lön rapport',
  es: 'reporte salarial de',
};

export default function ReportDetailsScreen({ route }) {
  const { language } = useContext(LanguageContext);
  const report = route.params;
  const reportDate = useMonth(report.date);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <AppText style={styles.headingText}>
            {report.worker.name} {headingText[language]} {reportDate}{' '}
            {new Date(report.date).getFullYear()}
          </AppText>
        </View>
        <View styles={styles.workDaysList}>
          <FlatList
            data={report.workDays}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <WorkDayListItem data={item} />;
            }}
            ItemSeparatorComponent={ListItemSeparator}
            ListHeaderComponent={ReportListHeader}
            ListFooterComponent={<ReportListFooter report={report} />}
          />
        </View>
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
    flex: 1,
    paddingBottom: '50%',
  },
  heading: {
    padding: 5,
    margin: 10,
  },
  headingText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 22,
    color: colors.primaryOpacity,
  },
  workDaysList: {
    flex: 1,
    paddingBottom: 50,
  },
});
