import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';

import Screen from '../../components/Screen';
import colors from '../../config/colors';
import useWeekDay from '../../hooks/useWeekDay';
import AppText from '../../components/AppText';
import { FlatList } from 'react-native-gesture-handler';

export default function ReportTableScreen({ route }) {
  const report = route.params;

  console.log(report);
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ScrollView>
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={{ color: colors.light }}>
              Datum
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: colors.light }}>
              Veckodag
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: colors.light }}>
              Projekt
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: colors.light }} numeric>
              Timmar
            </DataTable.Title>
          </DataTable.Header>
          {report.workDays.map((workDay) => {
            const date = new Date(workDay.date);
            const weekDay = useWeekDay(date);

            const totalHours = workDay.places.reduce((accumulator, place) => {
              return accumulator + place.hours;
            }, 0);

            return (
              <DataTable.Row key={workDay._id} style={styles.row}>
                <DataTable.Cell style={styles.cell}>
                  {date.getDate()}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>{weekDay}</DataTable.Cell>
                {workDay.places.map((place) => {
                  return (
                    <View key={place._id}>
                      <DataTable.Cell>{place.project.name} </DataTable.Cell>
                    </View>
                  );
                })}

                <DataTable.Cell style={styles.cell} numeric>
                  {totalHours}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryOpacity,
  },
  header: {
    backgroundColor: colors.primaryOpacity,
  },
  container: {
    backgroundColor: colors.white,
    minHeight: '100%',
  },
  row: {},
});
