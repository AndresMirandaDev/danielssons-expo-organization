import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import colors from '../../config/colors';
import useWeekDay from '../../hooks/useWeekDay';

export default function SubmittedDayListitem({ workDay }) {
  const date = new Date(workDay.date);
  const weekDay = useWeekDay(workDay.date);

  const totalHours = workDay.places.reduce((accumulator, place) => {
    return accumulator + parseInt(place.hours);
  }, 0);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <AppText style={styles.date}>
              {date.getMonth() + 1 + '/' + date.getDate()}
            </AppText>
          </View>
          <View style={styles.info}>
            <AppText>{weekDay}</AppText>
          </View>
          <View style={styles.places}>
            {workDay.places.map((place) => {
              return (
                <View key={place.project._id} style={styles.info}>
                  <View>
                    <AppText>
                      {place.project.name} {place.hours} (t)
                    </AppText>
                  </View>
                </View>
              );
            })}
          </View>
          <View>
            <AppText style={styles.totalHours}>{totalHours}</AppText>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  separator: {
    width: '100%',
    minHeight: 2,
    backgroundColor: colors.light,
  },
  date: {
    color: colors.primaryOpacity,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    width: 105,
  },
  totalHours: {
    fontWeight: 'bold',
    color: colors.primaryOpacity,
    fontSize: 23,
  },
});
