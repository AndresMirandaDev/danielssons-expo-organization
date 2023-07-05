import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../AppText';
import colors from '../../config/colors';
import useWeekDay from '../../hooks/useWeekDay';

export default function WorkDayListItem({ data: workDay }) {
  const workDayDate = new Date(workDay.date);
  const weekDay = useWeekDay(workDayDate);
  const [totalHours, setTotalHours] = useState(0);

  const getTotalHours = workDay.places.reduce((accumulator, place) => {
    return accumulator + place.hours;
  }, 0);

  useEffect(() => {
    function getHours() {
      const hours = getTotalHours;
      setTotalHours(hours);
    }
    getHours();
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.info, { marginLeft: -20 }]}>
        <AppText style={styles.text}>{workDayDate.getDate()}</AppText>
      </View>
      <View style={styles.info}>
        <AppText style={styles.text}>{weekDay}</AppText>
      </View>
      <View style={styles.info}>
        {workDay.places.map((place) => {
          return (
            <View key={place._id}>
              <AppText style={styles.text}>
                {place.project.name}
                {place.hours}(t)
              </AppText>
            </View>
          );
        })}
      </View>
      <View style={styles.info}>
        <AppText style={styles.text}>{totalHours}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: colors.white,
  },
  text: {
    textAlign: 'center',
    color: colors.medium,
  },
  info: {
    width: 100,
  },
});
